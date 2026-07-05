import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  timeout: 30000,
});

export async function predictImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}


export async function sendChatMessage(message) {
  const { data } = await api.post("/chat", {
    message
  });
  return data;
}

export async function getAboutStats() {
  const { data } = await api.get("/about");
  return data;
}
