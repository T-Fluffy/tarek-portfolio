import { Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      }}
    >
      <Navbar />

      <main style={{ flex: 1, padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer
        style={{
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
        }}
      >
        © {new Date().getFullYear()} Tarek.Dev - Crafter with ❤️ by Tarek Halloul
      </footer>
    </div>
  );
};

export default App;
