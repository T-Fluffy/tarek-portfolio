import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/UI/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import CanvasBackground from "./components/UI/CanvasBackground";

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// A small helper component to ensure the page starts at the top when navigating
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const cyberBlue = "#00BFFF";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
        color: "white",
        backgroundColor: "#050505", // Deep background base
      }}
    >
      <CanvasBackground />
      <ScrollToTop />
      <Navbar />

      {/* Adding a slight fade-in animation container */}
      <main style={{ 
        flex: 1, 
        padding: "1rem",
        animation: "fadeIn 0.8s ease-in" 
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "rgba(10, 10, 15, 0.9)",
          backdropFilter: "blur(5px)",
          borderTop: `1px solid rgba(0, 191, 255, 0.2)`,
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.9rem",
          fontFamily: "monospace"
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          SYSTEM_VERSION: <span style={{ color: cyberBlue }}>2.0.24</span>
        </div>
        © {new Date().getFullYear()} Tarek.Dev | Built with React & <span style={{ color: cyberBlue }}>Digital Rain</span>
      </footer>

      {/* Inline styles for the fade-in effect */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default App;