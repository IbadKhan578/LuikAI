# load documents
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings

loader = PyPDFLoader(
    r"luikAI\backend\documents\leukemia book.pdf",
                     )
documents = loader.load()


# split  the document
splitter = RecursiveCharacterTextSplitter(chunk_size=900, chunk_overlap=150)
chunks = splitter.split_documents(documents) 

for chunk in chunks:
    chunk.page_content = chunk.page_content




print(len(chunks))

