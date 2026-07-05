import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChatbot from "./components/FloatingChatbot";

import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Explainability from "./pages/Explainability";
import Chatbot from "./pages/Chatbot";
import Team from "./pages/Team";
import About from "./pages/About";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/explainability" element={<Explainability />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <FloatingChatbot />
    </div>
  );
}
