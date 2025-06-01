import React from "react";
import CanvasBackground from "../components/CanvasBackground";

const Contact: React.FC = () => {
  return (
    <>
      <CanvasBackground />
      <div className="relative z-10 max-w-3xl mx-auto p-6 text-white" style={{ position: "relative", zIndex: 1, color: "white" }}>
        <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
        <p className="mb-4">
          I'd love to hear from you! Here are my contact details:
        </p>
        <ul className="space-y-3 text-lg">
          <li>
            <strong>📍 Address:</strong> 12 rue Saddoc Yezza, Phayer, Hammam Sousse
          </li>
          <li>
            <strong>📞 Phone:</strong> +216 94542535
          </li>
          <li>
            <strong>📧 Email:</strong>{" "}
            <a
              href="mailto:halloultarek1@gmail.com"
              className="text-blue-400 hover:underline"
            >
              halloultarek1@gmail.com
            </a>
          </li>
          <li>
            <strong>🔗 LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/tarekhalloul"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              linkedin.com/in/tarekhalloul
            </a>
          </li>
          <li>
            <strong>🌐 Facebook:</strong>{" "}
            <a
              href="https://www.facebook.com/Hall.Tarek1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              facebook.com/tarekhalloul
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Contact;
