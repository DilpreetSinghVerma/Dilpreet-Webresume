# 🌐 Dilpreet's Digital Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://your-portfolio-url.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Tech-Stack-blue?style=for-the-badge&logo=react)](https://github.com/DilpreetSinghVerma/Dilpreet-Webresume)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A high-performance, immersive 3D web portfolio built to showcase engineering expertise in **AI/ML**, **Python**, and **Full-stack Development**. Featuring a futuristic Glassmorphic UI, real-time interactive components, and a custom-built AI assistant interface.

## 🚀 Key Features

- **🌀 Immersive 3D HUD**: Interactive central core built with **Three.js** and **React Three Fiber**.
- **🤖 REET AI (Digital Twin)**: A custom-built, soulful AI assistant integrated into the portfolio. She understands Dilpreet's journey, tech stack, and future vision.
- **🛡️ Case Study System**: Deep-dive modals for major projects like **Jarvis-0.2** and **EventFold**.
- **🎧 Intelligent Music Player**: Ambient background audio with seamless controls.
- **�️ Interactive Interactivity**: Features like **3D Tilt Cards** and magnetic elements for a premium feel.
- **✨ Micro-animations**: Fluid transitions powered by **Framer Motion**.
- **�📱 Ultra-Responsive**: Optimized for everything from mobile devices to ultra-wide monitors.

## 💀 Hidden Intelligence: Threat Mode

This portfolio contains a secret **"Threat Mode"** override.
- **Trigger**: Click REET AI's logo 5 times.
- **Effect**: The system undergoes a red-glitch override, bypassing security protocols and revealing restricted AI personality logs.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **3D Rendering**: Three.js & React Three Fiber
- **Components**: Radix UI & Shadcn UI

### Backend & Infrastructure
- **Server**: Express.js & Vercel Serverless Functions
- **Database**: PostgreSQL (via Neon)
- **ORM**: Drizzle ORM
- **API Integration**: Groq (Llama 3.1) for REET AI logic
- **Deployment**: Vercel

## 📂 Project Structure

```bash
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI & Section components (3D, layout, sections)
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Main entry pages
│   │   └── lib/         # Utility functions & API clients
├── server/          # Express backend & local endpoints
├── shared/          # Shared Zod schemas & types
└── api/             # Vercel serverless functions (REET AI backend)
```

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DilpreetSinghVerma/Dilpreet-Webresume.git
   cd Dilpreet-Webresume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_url
   GROQ_API_KEY=your_groq_api_key
   NODE_ENV=development
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   *The client will be available at `http://localhost:5000`*

## 🤖 Featured Projects

### 1. Jarvis-0.2
A high-end AI assistant featuring:
- Biometric Facial Recognition (MediaPipe/OpenCV)
- Dual-Brain Logic (Gemini 2.0 & Llama 3.3)
- Real-time Hardware Monitoring HUD

[View Jarvis-0.2 Repository](https://github.com/DilpreetSinghVerma/Jarvis-0.2)

### 2. EventFold
A premium event media management platform with:
- Interactive 3D Flipbook component
- Automated Luxury QR Card generation
- Stripe-powered tier-based subscriptions
- Scalable serverless architecture on Vercel

[View EventFold Repository](https://github.com/DilpreetSinghVerma/EventFold)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Created with ❤️ by **Dilpreet Singh**
