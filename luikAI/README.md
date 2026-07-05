# luikAI

Explainable AI platform for detecting leukemia subtypes from microscopic
blood cell images. A PyTorch CNN classifies the image; Grad-CAM shows which
cellular regions drove the prediction; a medical-assistant chatbot helps
users interpret results and learn about leukemia.

> luikAI is a research and academic demonstration project. It is not a
> medical device and must not be used for real clinical diagnosis.

## Project structure

```
luikAI/
├── backend/               FastAPI service: CNN inference, Grad-CAM, chatbot
│   ├── app/
│   │   ├── main.py        API routes
│   │   ├── model.py       CNN architecture + checkpoint loading
│   │   ├── gradcam.py     Grad-CAM implementation
│   │   ├── chatbot.py     Rule-based + optional Claude-backed assistant
│   │   ├── schemas.py     Pydantic request/response models
│   │   └── config.py      Paths, class labels, reported metrics
│   ├── checkpoints/       Place your trained luikai_cnn.pt here
│   └── requirements.txt
└── frontend/              React + Vite + Tailwind SPA
    └── src/
        ├── pages/         Home, Predict, Explainability, Chatbot, Team, About
        ├── components/    Navbar, Footer, FloatingChatbot, ViewportFrame, …
        └── api/client.js  Axios client for the backend API
```

## Quick start

**Backend**

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend**

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173`.

## Design system

- **Palette:** ink `#10151B`, slide (background) `#EFF2EE`, violet `#5B4B8A`
  (primary), rose `#C65B7C` (secondary), teal `#1F8A82`, amber `#E08E2A`
  (caution/heat accent) — inspired by Giemsa/Wright blood-stain tones.
- **Type:** Fraunces (display), Inter (body), IBM Plex Mono (data/labels).
- **Signature motif:** a circular "microscope eyepiece" viewport frame with
  stage tick marks, used consistently for the hero image, upload preview,
  and every Grad-CAM comparison so the whole product feels viewed through
  one instrument.

## Responsible AI notes

- Every prediction response includes a disclaimer field; do not remove it.
- The chatbot's system prompt (see `backend/app/chatbot.py`) enforces
  non-diagnostic, education-only language.
- Reported accuracy (96% train / 93% test) is disclosed as-is, with
  limitations documented on the About / Research page — avoid inflating or
  removing these figures in any deployment.
