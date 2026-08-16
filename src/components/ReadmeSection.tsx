import { useEffect, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { Box, CircularProgress, Typography } from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";

interface ReadmeSectionProps {
  owner: string;
  repo: string;
  branch: string;
}

const cyberBlue = "#00BFFF";

const ReadmeSection: React.FC<ReadmeSectionProps> = ({ owner, repo, branch }) => {
  const [readme, setReadme] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const rawBase = `https://github.com/${owner}/${repo}/blob/${branch}`;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setStatus("loading");
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
          headers: { Accept: "application/vnd.github.raw" },
        });
        if (res.status === 404) {
          if (!cancelled) setStatus("error");
          return;
        }
        if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
        const text = await res.text();
        if (!cancelled) {
          setReadme(text);
          setStatus(text.trim() ? "ready" : "error");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo]);

  const resolveSrc = (src?: string): string => {
    if (!src || /^(https?:|data:)/i.test(src)) return src ?? "";
    const path = src.replace(/^\.?\//, "").split("/").map(encodeURIComponent).join("/");
    return `${rawBase}/${path}?raw=true`;
  };

  const components: Components = {
    img: ({ node, src, alt, ...props }) => (
      <img src={resolveSrc(src)} alt={alt ?? ""} loading="lazy" {...props} />
    ),
    a: ({ node, href, children, ...props }) => {
      const external = href?.startsWith("http");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <Box
      component="section"
      sx={{
        mt: { xs: 6, md: 8 },
        border: "1px solid rgba(0, 191, 255, 0.2)",
        borderRadius: 2,
        bgcolor: "rgba(0, 0, 0, 0.45)",
        boxShadow: "0 0 30px rgba(0, 191, 255, 0.08)",
        p: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <TerminalIcon sx={{ color: cyberBlue, fontSize: 20 }} />
        <Typography
          variant="subtitle2"
          sx={{ color: cyberBlue, fontFamily: "monospace", fontWeight: "bold", letterSpacing: 2 }}
        >
          &gt; PROJECT_README://{owner}/{repo}
        </Typography>
      </Box>

      {status === "loading" && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 4 }}>
          <CircularProgress size={18} thickness={2} sx={{ color: cyberBlue }} />
          <Typography sx={{ color: cyberBlue, fontFamily: "monospace", letterSpacing: 2, fontSize: "0.8rem" }}>
            FETCHING_README...
          </Typography>
        </Box>
      )}

      {status === "error" && (
        <Box sx={{ py: 4 }}>
          <Typography sx={{ color: cyberBlue, fontFamily: "monospace", letterSpacing: 2, fontSize: "0.9rem", fontWeight: "bold" }}>
            &gt; ERROR: NO_README_FILE_DETECTED
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: "0.8rem", mt: 1 }}>
            The repository has no README.md to decrypt.
          </Typography>
        </Box>
      )}

      {status === "ready" && readme && (
        <Box className="readme">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            components={components}
          >
            {readme}
          </ReactMarkdown>
        </Box>
      )}

      <style>{`
        .readme { font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.75); overflow-wrap: break-word; }
        .readme h1, .readme h2, .readme h3, .readme h4 {
          font-family: monospace; color: ${cyberBlue}; font-weight: 700; letter-spacing: 1px;
          margin: 1.5em 0 0.6em; text-shadow: 0 0 12px rgba(0,191,255,0.25);
        }
        .readme h1 { font-size: 1.6rem; border-bottom: 1px solid rgba(0,191,255,0.25); padding-bottom: 0.3em; }
        .readme h2 { font-size: 1.35rem; }
        .readme h3 { font-size: 1.15rem; }
        .readme h1:first-child { margin-top: 0; }
        .readme p { margin: 0.7em 0; }
        .readme a { color: ${cyberBlue}; text-decoration: none; border-bottom: 1px dashed rgba(0,191,255,0.4); }
        .readme a:hover { color: #fff; border-bottom-color: #fff; }
        .readme code {
          font-family: Consolas, Menlo, monospace; background: rgba(0,191,255,0.08);
          color: #7de0ff; padding: 0.15em 0.35em; border-radius: 4px; font-size: 0.9em;
        }
        .readme pre {
          background: #0a0a0a; border: 1px solid rgba(0,191,255,0.2); border-left: 3px solid ${cyberBlue};
          border-radius: 6px; padding: 1em; overflow-x: auto; margin: 1em 0;
          box-shadow: 0 0 20px rgba(0,191,255,0.05);
        }
        .readme pre code { background: transparent; padding: 0; color: #e6e6e6; font-size: 0.88rem; }
        .readme table { border-collapse: collapse; width: 100%; margin: 1em 0; display: block; overflow-x: auto; }
        .readme th, .readme td { border: 1px solid rgba(0,191,255,0.2); padding: 0.5em 0.8em; text-align: left; }
        .readme th { background: rgba(0,191,255,0.08); color: ${cyberBlue}; font-family: monospace; }
        .readme tr:nth-child(even) { background: rgba(255,255,255,0.02); }
        .readme blockquote {
          border-left: 3px solid ${cyberBlue}; margin: 1em 0; padding: 0.2em 1em;
          color: rgba(255,255,255,0.55); font-style: italic; background: rgba(0,191,255,0.04);
        }
        .readme img { max-width: 100%; border-radius: 6px; border: 1px solid rgba(0,191,255,0.15); margin: 0.5em 0; }
        .readme ul, .readme ol { padding-left: 1.5em; margin: 0.7em 0; }
        .readme li { margin: 0.3em 0; }
        .readme li::marker { color: ${cyberBlue}; }
        .readme hr { border: none; border-top: 1px solid rgba(0,191,255,0.2); margin: 1.5em 0; }
        .readme details { margin: 0.8em 0; }
        .readme summary { cursor: pointer; color: ${cyberBlue}; font-family: monospace; }
        .readme input[type="checkbox"] { accent-color: ${cyberBlue}; }
        .readme .hljs-keyword, .readme .hljs-selector-tag { color: #ff7b72; }
        .readme .hljs-string, .readme .hljs-attr { color: #a5d6ff; }
        .readme .hljs-title, .readme .hljs-function .hljs-title { color: #ffa657; }
        .readme .hljs-comment { color: #8b949e; font-style: italic; }
        .readme .hljs-number, .readme .hljs-literal { color: #79c0ff; }
        .readme .hljs-built_in, .readme .hljs-type, .readme .hljs-variable, .readme .hljs-name { color: #ffa657; }
      `}</style>
    </Box>
  );
};

export default ReadmeSection;