# 🌐 Dilpreet's Digital Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://your-portfolio-url.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Tech-Stack-blue?style=for-the-badge&logo=react)](https://github.com/DilpreetSinghVerma/Dilpreet-Webresume)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A high-performance, immersive 3D web portfolio built to showcase engineering expertise in AI/ML and Full-stack development. Featuring a futuristic Glassmorphic UI, real-time interactive components, and a custom-built AI assistant interface.

## 🚀 Key Features

- **🌀 Immersive 3D HUD**: Interactive central core built with Three.js and React Three Fiber.
- **🛡️ Case Study System**: Deep-dive modals for major projects like **Jarvis-0.2**.
- **🎧 Intelligent Music Player**: Ambient background audio with seamless controls.
- **📱 Ultra-Responsive**: Optimized for everything from mobile devices to ultra-wide monitors.
- **✨ Micro-animations**: Fluid transitions powered by Framer Motion.
- **🤖 REET Chat Interface**: A custom AI helper integration for portfolio navigation.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **3D Rendering**: Three.js & React Three Fiber
- **Components**: Radix UI & Shadcn UI

### Backend & Infrastructure
- **Server**: Express.js
- **Database**: PostgreSQL (via Neon)
- **ORM**: Drizzle ORM
- **Deployment**: Vercel

## 📂 Project Structure

```bash
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI & Section components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Main entry pages
│   │   └── lib/         # Utility functions
├── server/          # Express backend & dynamic routes
├── shared/          # Shared Zod schemas & types
└── api/             # Vercel serverless functions
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
   NODE_ENV=development
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   *The client will be available at `http://localhost:5000`*

## 🤖 Featured Project: Jarvis-0.2

This portfolio serves as the primary showcase for **Jarvis-0.2**, a high-end AI assistant featuring:
- Biometric Facial Recognition (MediaPipe/OpenCV)
- Dual-Brain Logic (Gemini 2.0 & Llama 3.3)
- Real-time Hardware Monitoring HUD

[View Jarvis-0.2 Repository](https://github.com/DilpreetSinghVerma/Jarvis-0.2)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Created with ❤️ by **Dilpreet Singh**
