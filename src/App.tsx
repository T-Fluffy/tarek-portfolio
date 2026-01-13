import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/UI/Navbar";
import Footer from "./components/UI/Footer"; // Import the new cooler footer
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import CanvasBackground from "./components/UI/CanvasBackground";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
        color: "white",
        backgroundColor: "#050505",
      }}
    >
      <CanvasBackground />
      <ScrollToTop />
      <Navbar />

      <main style={{ 
        flex: 1, 
        padding: "1rem",
        animation: "fadeIn 0.8s ease-in",
        position: "relative",
        zIndex: 2
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* The new Footer component replaces the old inline div */}
      <Footer />

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