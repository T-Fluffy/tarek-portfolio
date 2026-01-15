# 💼 Tarek.dev — Developer Portfolio

A high-performance, cyberpunk-inspired developer portfolio built with **React**, **TypeScript**, and **Material UI**. This site doesn't just show projects; it actively syncs with the GitHub API to fetch live data.

![Social Preview](./social-preview.png)

---

## 🚀 Live Features

- ⚡ **Dynamic Repository Sync**: Automatically fetches and decrypts project data directly from GitHub.
- 🖼️ **Adaptive Image Loading**: Uses custom `social-preview.png` assets with an automatic **Socialify** fallback for a seamless UI.
- 🎨 **Modern Cyber-Aesthetic**: Custom-themed Material UI components with glowing states and glassmorphism.
- 📱 **Responsive Grid**: Fully optimized for mobile, tablet, and desktop interfaces.
- 📁 **Modular Architecture**: 
  - **Terminal/Home** – Main interface entry.
  - **Project Gallery** – Dynamic grid of live repositories.
  - **Project Details** – High-resolution view of source code and live demos.

---

## 🛠️ Technical Arsenal

| Tool | Capability |
| :--- | :--- |
| **React 18** | Component-based UI architecture |
| **TypeScript** | Strict type-safety across the project |
| **Material UI (MUI)** | Advanced styling and responsive grid systems |
| **GitHub API** | Real-time project data fetching |
| **Vite** | Lightning-fast build and dev environment |

---

## ⚙️ Development Progress: Latest Updates

- [x] **GitHub Integration**: Implemented dynamic project fetching in `Projects.tsx`.
- [x] **Smart Branch Detection**: System now automatically detects `main` vs `master` branches.
- [x] **Visual Identity**: Integrated `social-preview.png` for all repository cards.
- [x] **Error Handling**: Established "base-to-gallery" navigation for missing data.

---

## 📦 Local Deployment

```bash
# 1. Clone the repository
git clone [https://github.com/T-Fluffy/tarek-portfolio.git](https://github.com/T-Fluffy/tarek-portfolio.git)
cd tarek-portfolio

# 2. Install dependencies
npm install

# 3. Boot the local server
npm run dev