import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

interface TerminalModalProps {
  open: boolean;
  onClose: () => void;
}

const cyberBlue = "#00BFFF";

const WELCOME = [
  "TERMINAL://TAREK_HALLOUL v2.0.26",
  "TYPE 'help' TO LIST AVAILABLE_COMMANDS.",
  "",
];

const TerminalModal: React.FC<TerminalModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [lines, setLines] = useState<string[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setLines(WELCOME);
      setInput("");
      setHistoryIdx(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const [cmd, ...rest] = trimmed.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");
    const out: string[] = [];

    switch (cmd) {
      case "help":
        out.push(
          "AVAILABLE_COMMANDS:",
          "  help          show this list",
          "  about         go to /about",
          "  projects      go to /projects",
          "  contact       go to /contact",
          "  home          go to /",
          "  resume [fr]   open resume (PDF)",
          "  email         open mail client",
          "  github        open github profile",
          "  linkedin      open linkedin profile",
          "  whoami        show identity",
          "  ls            list directories",
          "  cat <file>    read a file",
          "  date          show system date",
          "  clear         clear the screen",
          "  matrix        activate the matrix",
          "  sudo          escalate privileges (jk)",
          "  exit          close terminal",
        );
        break;
      case "about":
        out.push("> NAVIGATING_TO_ABOUT...");
        setTimeout(() => go("/about"), 350);
        break;
      case "projects":
        out.push("> NAVIGATING_TO_PROJECTS...");
        setTimeout(() => go("/projects"), 350);
        break;
      case "contact":
        out.push("> NAVIGATING_TO_CONTACT...");
        setTimeout(() => go("/contact"), 350);
        break;
      case "home":
        out.push("> NAVIGATING_TO_HOME...");
        setTimeout(() => go("/"), 350);
        break;
      case "resume":
      case "cv":
        {
          const lang = arg === "fr" ? "FR" : "EN";
          out.push(`> OPENING_RESUME_WEB_${lang}.PDF...`);
          window.open(`${import.meta.env.BASE_URL}assets/CV_TarekHalloul_Web${lang === "FR" ? "_FR" : ""}.pdf`, "_blank");
        }
        break;
      case "email":
        out.push("> OPENING_MAIL_CLIENT...");
        window.location.href = "mailto:halloultarek1@gmail.com";
        break;
      case "github":
        out.push("> OPENING_GITHUB_PROFILE...");
        window.open("https://github.com/T-Fluffy", "_blank");
        break;
      case "linkedin":
        out.push("> OPENING_LINKEDIN_PROFILE...");
        window.open("https://www.linkedin.com/in/tarekhalloul/", "_blank");
        break;
      case "whoami":
        out.push("TAREK_HALLOUL // FULL-STACK_DEVELOPER");
        break;
      case "ls":
        out.push(
          "about/   projects/   contact/   home/",
          "cv-web.pdf           cv-web-fr.pdf",
          "cv-gameplay.pdf      cv-gameplay-fr.pdf",
        );
        break;
      case "cat":
        {
          const file = arg.toLowerCase();
          if (file === "cv-web.pdf" || file === "resume" || file === "resume.pdf") {
            out.push("> OPENING_CV_WEB_EN.PDF...");
            window.open(`${import.meta.env.BASE_URL}assets/CV_TarekHalloul_Web.pdf`, "_blank");
          } else if (file === "cv-web-fr.pdf" || file === "resume fr" || file === "resume-fr.pdf") {
            out.push("> OPENING_CV_WEB_FR.PDF...");
            window.open(`${import.meta.env.BASE_URL}assets/CV_TarekHalloul_Web_FR.pdf`, "_blank");
          } else if (file === "cv-gameplay.pdf") {
            out.push("> OPENING_CV_GAMEPLAY_EN.PDF...");
            window.open(`${import.meta.env.BASE_URL}assets/CV_TarekHalloul_Gameplay.pdf`, "_blank");
          } else if (file === "cv-gameplay-fr.pdf") {
            out.push("> OPENING_CV_GAMEPLAY_FR.PDF...");
            window.open(`${import.meta.env.BASE_URL}assets/CV_TarekHalloul_Gameplay_FR.pdf`, "_blank");
          } else {
            out.push(`cat: '${arg || "<file>"}': NO_SUCH_FILE`);
          }
        }
        break;
      case "date":
        out.push(new Date().toString());
        break;
      case "clear":
        setLines([]);
        return;
      case "matrix":
        out.push("Wake up, Tarek... The Matrix has you.", "Follow the white rabbit.");
        break;
      case "sudo":
        out.push("nice try. you have no power here.");
        break;
      case "exit":
        out.push("> TERMINATING_SESSION...");
        setTimeout(onClose, 350);
        break;
      default:
        out.push(`command not found: '${trimmed}'`, "TYPE 'help' FOR AVAILABLE_COMMANDS.");
    }

    setLines(prev => [...prev, ...out]);
  };

  const handleSubmit = () => {
    const raw = input;
    setLines(prev => [...prev, `> ${raw}`]);
    setHistory(h => [raw, ...h].slice(0, 50));
    setHistoryIdx(-1);
    runCommand(raw);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      if (next >= 0) {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "#0a0a0a",
          border: `1px solid ${cyberBlue}33`,
          borderRadius: 2,
          boxShadow: `0 0 40px ${cyberBlue}22`,
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          borderBottom: `1px solid ${cyberBlue}22`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ff5f56" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ffbd2e" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#27c93f" }} />
        </Box>
        <Typography sx={{ color: cyberBlue, fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: 1 }}>
          &gt;_ TERMINAL://TAREK_HALLOUL
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "#fff" } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Box
          ref={outputRef}
          sx={{ p: 2, height: 320, overflowY: "auto", bgcolor: "#050505" }}
        >
          {lines.map((line, i) => (
            <Typography
              key={i}
              sx={{
                color: line.startsWith(">") || line.startsWith("TERMINAL")
                  ? cyberBlue
                  : "rgba(255,255,255,0.75)",
                fontFamily: "monospace",
                fontSize: "0.82rem",
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
              }}
            >
              {line || "\u00A0"}
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            borderTop: `1px solid ${cyberBlue}22`,
            bgcolor: "#0a0a0a",
          }}
        >
          <Typography sx={{ color: cyberBlue, fontFamily: "monospace", fontWeight: "bold" }}>&gt;</Typography>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              handleKeyDown(e);
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="type 'help'..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontFamily: "Consolas, Menlo, monospace",
              fontSize: "0.82rem",
            }}
          />
          <Box className="term-cursor" sx={{ width: 8, height: 16, bgcolor: cyberBlue }} />
        </Box>
      </DialogContent>

      <style>{`
        @keyframes termBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        .term-cursor { animation: termBlink 1s infinite; }
      `}</style>
    </Dialog>
  );
};

export default TerminalModal;