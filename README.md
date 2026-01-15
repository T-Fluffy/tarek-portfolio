# 💼 Tarek.dev — Full-Stack Developer Portfolio

A high-performance, cyberpunk-inspired developer portfolio. This system features a **React 18** frontend and a specialized **.NET 8** backend designed for secure communication and dynamic project synchronization.

![Social Preview](./social-preview.png)

---

## 🚀 System Features

- ⚡ **Dynamic Repository Sync**: Seamless integration with GitHub API to fetch live project data.
- 📬 **Secure Contact Gateway**: A dedicated **.NET Web API** for handling encrypted message transmissions.
- 🛡️ **Rate Limiting Protection**: Backend security that prevents spam using a **Fixed Window Limiter** (3 requests per minute).
- 🖼️ **Adaptive Image Logic**: LFS-aware image fetching with automatic **Socialify** fallback and placeholder redundancy.
- 🚧 **Fault Tolerance**: Integrated **React Error Boundaries** to prevent total UI failure during API hiccups.

---

## 🛠️ Technical Arsenal

### Frontend (React/TS)
| Tool | Capability |
| :--- | :--- |
| **React 18** | Component-based UI architecture |
| **TypeScript** | Strict type-safety with `verbatimModuleSyntax` |
| **Vitest + Happy-DOM** | High-speed unit testing and DOM simulation |
| **Material UI** | Advanced styling and responsive grid systems |

### Backend (Portfolio.Backend)
| Tool | Capability |
| :--- | :--- |
| **.NET 8** | Modern, high-performance API framework |
| **FluentEmail** | Clean abstraction for SMTP transmissions via Gmail |
| **xUnit** | Automated testing for data integrity and validation |
| **CORS Policy** | Secure cross-origin resource sharing for local and production builds |

---

## 🧪 Testing Suite

### Backend (xUnit)
Run tests via CLI: `dotnet test`
- **Data Integrity**: Validating `ContactRequest` models and field constraints.
- **Validation Logic**: Ensuring the API identifies invalid email formats before transmission.

### Frontend (Vitest)
Run tests via CLI: `npm test`
- **Component Integrity**: Verifying `ProjectCard` renders dynamic GitHub data and Technology Chips correctly.
- **URL Resolution**: Testing the specific `?raw=true` logic for Git LFS compatibility.
- **Environment**: Optimized using `happy-dom` for faster execution and ES Module compatibility.

---

## ⚙️ Development Progress

- [x] **Secure Uplink**: Integrated **Portfolio.Backend** for contact form handling.
- [x] **Spam Prevention**: Implemented `.AddRateLimiter` to protect the SMTP gateway.
- [x] **GitHub LFS Resolution**: Fixed image pointer issues for high-res repository previews.
- [x] **UI Resilience**: Added **Error Boundaries** to catch and isolate component-level crashes.
- [x] **Type Strictness**: Refactored for `verbatimModuleSyntax` and optional chaining on repository data.

---

## 📦 Local Deployment

### 1. Backend Setup
1. Navigate to `/Portfolio.Backend`.
2. Create an `appsettings.json` file based on `appsettings.Example.json`.
3. Add your Gmail App Password to the `SmtpSettings` block.
```bash
dotnet restore
dotnet run
```
### 2. Frontend Setup
1. Navigate to `/Portfolio.Frontend`.
2. Create an `appsettings.json` file based on `appsettings.Example.json`.
3. Add your GitHub Personal Access Token to the `GithubSettings` block.
```bash
npm install
nm run test
npm run dev
```


