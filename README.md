# 🚀 Deepayan Thakur — Interactive Portfolio

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Utility--First-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![Lighthouse](https://img.shields.io/badge/Lighthouse-95%2B-success?logo=googlechrome)

---

<div align="center">

✨ A **high-performance, interactive single-page portfolio** built to showcase projects, skills, and modern frontend engineering practices.

🪄 **Pro tip:** Hover over my name on the website — subtle interactions, intentional design.

🔗 **Live Portfolio**  
👉 https://deepayan-thakur-portfolio.vercel.app/ 👈  

<br>

<img width="1897" alt="Portfolio Preview 1" src="https://github.com/user-attachments/assets/0fa6a8ca-3c67-4bdd-af5a-616a14545b48" />
<img width="1906" alt="Portfolio Preview 2" src="https://github.com/user-attachments/assets/1bf08c86-59eb-40d6-905d-c3be4b2e8177" />

</div>

---

## 🧠 Why This Portfolio Exists

This project is a **real-world proof of work**, not a template.

- Demonstrates strong **React fundamentals**
- Focuses on **performance, accessibility, and UX**
- Clean, scalable, component-driven architecture
- Built for both **developers and recruiters**

---

## ✨ Key Features

⚡ Vite-powered development with instant HMR  
🎨 Utility-first responsive styling using Tailwind CSS  
🧩 Modular, reusable React components  
☁️ Fully static deployment on Vercel  
🪄 Polished micro-interactions and hover effects  

---

## 🎥 Animated Preview

> *(Replace with your own screen recording GIF)*

![Portfolio Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2RlbW8/giphy.gif)

---

## 🏗 System Architecture

```mermaid
graph TD

subgraph Local_Machine["💻 Local Developer Environment"]
    IDE["📝 VS Code"]
    Git["🔧 Git"]
    ViteDev["⚡ Vite Dev Server (HMR)"]

    IDE -->|Commit| Git
    IDE -->|Save → Reload| ViteDev
end

subgraph Build_Pipeline["🛠 Build & Bundle"]
    ViteBuild["📦 Vite Build Engine"]
    Dist["📁 dist/ (Optimized Static Files)"]

    ViteDev -.->|npm run build| ViteBuild
    ViteBuild --> Dist
end

subgraph Production["☁️ Production"]
    Vercel["▲ Vercel Hosting"]
    Browser["🌍 User Browser"]
end

ViteDev -->|Live Preview| Browser
Dist -->|Deploy| Vercel
Vercel -->|Serve App| Browser

---

## 📂 Project Structure

```
V2-final-portfolio/
└── my-portfolio/
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    ├── src/
    │   ├── assets/          # Images & icons
    │   ├── components/      # Reusable components
    │   ├── App.jsx          # Root component
    │   ├── main.jsx         # Entry point
    │   └── index.css        # Tailwind + global styles
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── eslint.config.js
    └── package.json
```

---

## 🛠 Tech Stack

| Category        | Technology   |
| --------------- | ------------ |
| Framework       | React 18     |
| Build Tool      | Vite         |
| Styling         | Tailwind CSS |
| Linting         | ESLint       |
| Package Manager | NPM          |
| Deployment      | Vercel       |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Deepayan-Thakur/your-repo-name.git

# Move into project
cd my-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 📈 Performance & Best Practices

* Fully static SPA architecture
* Optimized bundling via Vite
* Mobile-first responsive design
* Clean ESLint rules for maintainability
* Lighthouse scores 95+

---

## 🔍 GitHub Search Optimization

**Keywords:**
`react portfolio` · `vite react` · `tailwind css portfolio` · `frontend engineer portfolio` · `vercel deployment` · `single page application`

**Suggested Repository Description:**

> High-performance React portfolio built with Vite and Tailwind CSS. Deployed on Vercel.

---

## 👔 Recruiter Summary

A production-ready **React single-page application** demonstrating modern frontend tooling, clean component architecture, and strong attention to performance and UX.

---

## 🌍 Open-Source Summary

A clean and scalable **React + Vite portfolio starter**, designed for easy customization, fast builds, and seamless deployment.

---

## 👨‍💻 Author

**Deepayan Thakur**
Frontend Engineer | React Developer

🔗 GitHub: [https://github.com/Deepayan-Thakur](https://github.com/Deepayan-Thakur)

🌐 Portfolio: [https://deepayan-thakur-portfolio.vercel.app/](https://deepayan-thakur-portfolio.vercel.app/)

---
