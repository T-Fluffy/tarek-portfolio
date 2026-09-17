// Single source of truth for AI/search-discovery files:
// robots.txt, sitemap.xml and llms.txt.
//
// Default canonical URL. Overridable per-build with VITE_SITE_URL
// (see vite.config.ts), so moving to a custom domain needs no code change:
//   VITE_SITE_URL=https://example.com npm run build
export const DEFAULT_SITE_URL = "https://T-Fluffy.github.io/tarek-portfolio";

// App routes (HashRouter: everything resolves to index.html; the sitemap
// documents the canonical client-side URLs for crawlers and AI readers).
interface SeoRoute {
  path: string;
  priority: string;
  changefreq: string;
}

const routes: SeoRoute[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.9", changefreq: "monthly" },
  { path: "/projects", priority: "0.9", changefreq: "weekly" },
  { path: "/BooksPage", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "yearly" },
];

// Curated project pages: quality over quantity. Numeric IDs are the stable
// GitHub repository IDs used by the /project/:projectId route.
interface SeoProject {
  id: number;
  name: string;
  blurb: string;
}

const projects: SeoProject[] = [
  {
    id: 1354115610,
    name: "Duel-Masters",
    blurb:
      "Modern digital recreation of the Duel Masters trading card game: Godot 4 C# client with pure-C# data-driven architecture.",
  },
  {
    id: 1135234827,
    name: "tarek-portfolio-backend",
    blurb:
      "ASP.NET Core backend for this portfolio: contact API with validation, rate limiting and email delivery.",
  },
  {
    id: 508857959,
    name: "ThreeDMarket",
    blurb:
      "Full-stack 3D asset marketplace: Angular + three.js frontend with a Spring Boot backend.",
  },
  {
    id: 1325975559,
    name: "DungeonWorldApp",
    blurb:
      "Full-stack web app that turns Fighting Fantasy-style gamebook PDFs into playable adventures.",
  },
  {
    id: 1106587367,
    name: "chkoba",
    blurb: "2D card game built with the Godot engine.",
  },
  {
    id: 1351002529,
    name: "Project-Structure",
    blurb:
      "Starter Godot project-structure template for C# users with a clean architecture.",
  },
  {
    id: 1149019373,
    name: "StockManagementApp",
    blurb: "Full-stack stock management application.",
  },
  {
    id: 1020425980,
    name: "duel_master",
    blurb: "Backend service for the Duel Masters card game.",
  },
  {
    id: 739760490,
    name: "My3DChess",
    blurb: "3D chess built with the Unity engine.",
  },
  {
    id: 999870584,
    name: "editor",
    blurb: "Online document editor platform web app.",
  },
];

// AI training / data-collection crawlers that must stay out.
// General search engines (Googlebot, Bingbot) are NOT listed here:
// they remain allowed so recruiters can find the site via search.
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "Amazonbot",
];

export function buildRobotsTxt(site: string): string {
  const blocked = AI_BOTS.map(
    (bot) => `User-agent: ${bot}\nDisallow: /`,
  ).join("\n");
  return `User-agent: *
Allow: /

# AI training and data-collection bots: do not crawl.
${blocked}

Sitemap: ${site}/sitemap.xml
`;
}

export function buildSitemapXml(site: string, lastmod: string): string {
  const urls = [
    ...routes.map((r) => ({
      loc: r.path === "/" ? `${site}/` : `${site}/#${r.path}`,
      ...r,
    })),
    ...projects.map((p) => ({
      loc: `${site}/#/project/${p.id}`,
      priority: "0.6",
      changefreq: "monthly",
    })),
  ];
  const entries = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

// Curated AI brief: professional summary only. No phone numbers, addresses
// or employment-history detail — that lives in the downloadable CVs for
// humans who click through.
export function buildLlmsTxt(site: string): string {
  const projectLines = projects
    .map((p) => `- [${p.name}](${site}/#/project/${p.id}): ${p.blurb}`)
    .join("\n");
  return `# Tarek Halloull

> Junior Software Engineer and Game Developer specializing in Unity and Godot game development and full-stack web applications.

## About

- [About Tarek](${site}/#/about): Background, mission statement, and downloadable CVs (Web and GameDev variants, English and French).
- [Projects](${site}/#/projects): Full catalogue of game-development and web projects.
- [Reading list](${site}/#/BooksPage): Professional books read or currently reading, with ratings.
- [Contact](${site}/#/contact): Contact form for professional inquiries.

## Selected Projects

${projectLines}

## Contact

- [Contact form](${site}/#/contact)
- GitHub: https://github.com/T-Fluffy
- LinkedIn: https://www.linkedin.com/in/tarekhalloul/
- Email: halloultarek1@gmail.com
`;
}
