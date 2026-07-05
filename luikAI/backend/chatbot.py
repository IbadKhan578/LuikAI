from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI , MistralAIEmbeddings
import os 
from langchain_community.vectorstores import FAISS
from langchain_community.retrievers.bm25 import BM25Retriever
from langchain_classic.retrievers.ensemble import EnsembleRetriever
from typing import TypedDict , List 
from langchain_core.documents import Document
from pydantic import BaseModel 
from langchain_core.messages import HumanMessage , SystemMessage
from langsmith import traceable
from langgraph.graph import StateGraph, START , END
from langgraph.checkpoint.memory import MemorySaver

import re
from pydantic import BaseModel
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()



# set up llm
llm = ChatMistralAI(
    api_key= os.getenv('MISTRAL_API_KEY'),
    model="open-mistral-7b",  # or mistral-large-latest
)

# set up embedding model
embeddings = MistralAIEmbeddings(
    model='mistral-embed',
    api_key= os.getenv('MISTRAL_API_KEY')

)




vector_store = FAISS.load_local(
    "faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)


dense_retriever = vector_store.as_retriever(search_kwargs={"k": 4})

bm25_retriever = BM25Retriever.from_documents(vector_store.docstore._dict.values())
bm25_retriever.k = 4

hybrid_retriever = EnsembleRetriever(
    retrievers=[dense_retriever, bm25_retriever],
    weights=[0.6, 0.4]
)



# states


class RagState(TypedDict):
    question:str
    documents: List[Document]
    
    strips: List[str]            # output of decomposition (sentence strips)
    kept_strips: List[str]       # after filtering (kept sentences)
    refined_context: str         # recomposed internal knowledge (joined kept_strips)
    answer:str

@traceable
def retriver(state:RagState):
    query = state['question']
    return {"documents": hybrid_retriever.invoke(query)} 
 



# -----------------------------
# Sentence-level DECOMPOSER
# -----------------------------
@traceable
def decompose_to_sentences(text: str) -> List[str]:
    text = re.sub(r"\s+", " ", text).strip()
    sentences = re.split(r"(?<=[.!?])\s+", text)
    return [s.strip() for s in sentences if len(s.strip()) > 20]


class KeepOrDrop(BaseModel):
    keep: bool


filter_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a relevance filter. From the sentences below, keep only those that help answer the question."
        ),
        ("human", "Question: {question}\n\nSentences:\n{sentences}")
    ]
)

def refine(state):
    q = state["question"]
    context = "\n".join(d.page_content for d in state["documents"])

    strips = decompose_to_sentences(context)

    response = llm.invoke(
        filter_prompt.format(
            question=q,
            sentences="\n".join(strips)
        )
    )

    return {
        "strips": strips,
        "kept_strips": [],
        "refined_context": response.content
    }

@traceable
def generate(state:RagState):

    message= [
        SystemMessage(content='you are an helpful assistant'),
HumanMessage(
    content=(
        "You must answer ONLY using the information provided in the CONTEXT.\n"
        "Do NOT use outside knowledge.\n"
        "if the question.query is greaeting example, hi , hello , greet warmly"
        "do not say the context, the provided context , it should flow like natural chatbot"
        "Do NOT guess or infer missing details.\n"
        "If the answer is not explicitly stated in the context, reply exactly with:\n"
        "'Sorry, I can't help you with this Question. Ask Another Question.'\n\n"
        "Do NOT add any introduction phrases such as:\n"
        "'Based on the context', 'According to the text', or similar.\n\n"
        "CONTEXT:\n"
        f"{state['refined_context']}\n\n"
        f"QUESTION:\n{state['question']}\n\n"
    )
)
    ]
    response = llm.invoke(message)
    return {'answer':response.content}

memory = MemorySaver()

graph = StateGraph(RagState)
# add node
graph.add_node('Retriever',retriver)
graph.add_node("refine", refine)
graph.add_node('generate',generate)

#  add edge
graph.add_edge(START,"Retriever")
graph.add_edge('Retriever','refine')
graph.add_edge('refine','generate')
graph.add_edge('generate',END)

workflow = graph.compile(checkpointer=memory)

