# 🎉 **Deepayan Thakur Portfolio**

<div align="center">

A modern, responsive **single-page portfolio application** built to showcase personal projects, skills, and professional experience.
## Use mouse hover on my name and see the magic 🪄
🔗 <em>[**Live Website:**](https://github.com/Deepayan-Thakur)</em>

<br>
<img width="1897" height="1079" alt="image" src="https://github.com/user-attachments/assets/0fa6a8ca-3c67-4bdd-af5a-616a14545b48" />
<img width="1906" height="869" alt="image" src="https://github.com/user-attachments/assets/1bf08c86-59eb-40d6-905d-c3be4b2e8177" />

<br>

<em> 👉 https://deepayan-thakur-portfolio.vercel.app/ 👈
</em>
</div>

---

## 📖 **Overview**

This project is a fully client-side **Single Page Application (SPA)** built with a modern toolchain, ensuring top-tier performance and effortless scalability.

### **✨ Key Features**

  **⚡ Performance:** Vite-powered development with instant HMR (Hot Module Replacement).  
  **🎨 Styling:** Tailwind CSS for a utility-first, responsive UI.  
  **🧩 Architecture:** Component-driven React structure.  
  **☁️ Deployment:** Fully static, deployed seamlessly on Vercel.

---

## 🏗 **System Architecture**

The following Mermaid diagram captures the development → build → deployment flow of the project.

```mermaid
%% Full body background white
graph TD

%% 💻 Local Dev Environment
subgraph Local_Machine["💻 Local Developer Environment"]
    IDE["📝 VS Code Editor"]
    Git["🔧 Local Git Repository"]
    ViteDev["⚡ Vite Dev Server HMR"]

    IDE -->|Commit Code| Git
    IDE -->|Save → Auto Refresh| ViteDev
end

%% 🛠 Build & Bundle
subgraph Build_Pipeline["🛠 Build & Bundle Stage"]
    ViteBuild["📦 Vite Build Engine"]
    Dist["📁 dist/ — Optimized Static Files"]

    ViteDev -.->|npm run build| ViteBuild
    ViteBuild -->|Bundle JS/CSS/Assets| Dist
end

%% ☁️ Production / Hosting
subgraph Production["☁️ Production Environment"]
    Vercel["▲ Vercel Static Hosting"]
    Browser["🌍 User Browser"]
end

%% Flows
ViteDev -->|Instant HMR Updates| Browser
Dist -->|Deploy to Cloud| Vercel
Vercel -->|Serve index.html + Bundles| Browser

%% Styles with pastel backgrounds and dark text
classDef local fill:#cce5ff,stroke:#3399ff,stroke-width:2px,rx:12,ry:12,color:#1a1a1a,font-weight:bold;
classDef build fill:#fff3cc,stroke:#d1a308,stroke-width:2px,rx:12,ry:12,color:#1a1a1a,font-weight:bold;
classDef prod fill:#d4ffd4,stroke:#2f855a,stroke-width:2px,rx:12,ry:12,color:#1a1a1a,font-weight:bold;

class Local_Machine local
class Build_Pipeline build
class Production prod
```
---

## 📂 **Project Structure**

```
V2-final-portfolio/
└── my-portfolio/
    ├── public/              # Static assets and entry HTML
    │   ├── index.html       # SPA bootstrap file
    │   └── favicon.ico
    ├── src/
    │   ├── assets/          # Images & icons
    │   ├── components/      # Reusable React components
    │   ├── App.jsx          # Root App component
    │   ├── main.jsx         # Entry point (DOM mount)
    │   └── index.css        # Tailwind + global styles
    ├── tailwind.config.js   # Tailwind setup
    ├── postcss.config.js    # PostCSS processing
    ├── vite.config.js       # Vite build config
    ├── eslint.config.js     # ESLint rules
    └── package.json         # Dependencies & scripts
```

---

## 🛠 **Tech Stack**

| Category | Technology |
|---------|------------|
| **Core Framework** | React 18+ |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Linting** | ESLint |
| **Package Manager** | NPM |

---

## ⚡ **Getting Started**

Run the project locally using the following steps:

### **📌 Prerequisites**
- Node.js (v14+)
- npm

---

### **📥 Installation**

#### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/Deepayan-Thakur/Deepayan-Thakur-Portfolio.git
cd Deepayan-Thakur-Portfolio
```

#### **2️⃣ Navigate to Project**

```bash
cd V2-final-portfolio/my-portfolio
```

#### **3️⃣ Install Dependencies**

```bash
npm install
```

#### **4️⃣ Start Development Server**

```bash
npm run dev
```

Open the URL shown in your terminal (typically **http://localhost:5173**).

---

## 🏭 **Building for Production**

To generate an optimized production build:

```bash
npm run build
```

Output will be generated inside the `dist/` folder — ready for deployment.

---

## 📬 **Contact**

**👨‍💻 Developer:** Deepayan Thakur  
**🔗 GitHub:** [github.com/Deepayan-Thakur](https://github.com/Deepayan-Thakur)

---
