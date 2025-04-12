import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MindMap from "./MindMap";
import StudyAids from "./StudyAids";

function Home() {
  return (
    <div>
      <section>
        <h2>Welcome to Study Smart</h2>
        <p>Transform how you study with interactive tools and AI-powered aids.</p>
      </section>

      <section className="mission">
        <h2>Mission Statement</h2>
        <p>
          Our mission is to help students transform lecture materials, meetings, and
          videos into interactive, visual, and AI-powered study aids — like mindmaps,
          flashcards, and chatbot-driven Q&A — so that anyone can learn smarter, not harder.
        </p>
      </section>

      <section className="demo">
        <h2>Demonstration</h2>
        <img
          src="https://placehold.co/600x300?text=Demo+Mindmap"
          alt="Demo Mind Map"
          className="demo-image"
        />
      </section>
    </div>
  );
}

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4040/";
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((data) => setMessage(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1 className="title">Study Smart: Bitcamp 2025</h1>
          <nav className="navbar">
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/mindmap" className="nav-button">Mind Map</Link>
            <Link to="/studyaids" className="nav-button">Additional Study Aids</Link>
          </nav>
        </header>

        {error && <p className="error">Error: {error}</p>}
        {message && <p className="message">Message: {message}</p>}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mindmap" element={<MindMap />} />
          <Route path="/studyaids" element={<StudyAids />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;