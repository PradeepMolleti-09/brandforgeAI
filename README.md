# 🛡️ BrandForge AI: The Neural Marketing Engine 🔨

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Konva](https://img.shields.io/badge/Canvas-Konva-blue?style=for-the-badge)](https://konvajs.org/)
[![Tailwind](https://img.shields.io/badge/UI-Tailwind-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**BrandForge AI** is a professional-grade social media design engine that bridges the gap between AI generation and manual creative precision. It transforms raw marketing ideas into brand-consistent, high-resolution posters in seconds.

---

## ✨ Key Features

### 🧠 Neural Generation Core
- **AI Copywriting**: Generates high-impact headlines and body text tailored to your brand's voice.
- **Smart Layouts**: Automatically arranges elements based on psychological design principles.
- **Neural Typography**: Suggests curated font pairings for maximum readability and "drama."

### 🎨 Professional Canvas Editor
- **Precision Control**: Full drag-and-drop, scaling, and transformation tools powered by `react-konva`.
- **History System**: Robust Undo/Redo functionality for a non-destructive workflow.
- **Asset Library**: Integrated access to high-quality stickers, shapes, and backgrounds.
- **Live Engine Status**: Visual feedback on neural processing and cloud sync.

### 📱 Responsive Architecture
- **Multi-Device Support**: Fully functional on Mobile, Tablet, and Desktop.
- **Aspect Ratio Switching**: Seamlessly toggle between 1:1 (Instagram), 9:16 (Stories), 16:9 (Twitter/X), and more.
- **High-Res Export**: Server-side rendering optimizations for crisp, export-ready PNGs via Cloudinary.

---

## 🏗️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Server Actions) |
| **Rendering** | [Konva.js](https://konvajs.org/) & [React-Konva](https://github.com/konvajs/react-konva) |
| **State** | [Zustand](https://github.com/pmndrs/zustand) (with Persistence & History middleware) |
| **Styling** | Vanilla CSS + [Tailwind CSS 4](https://tailwindcss.com/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) with Mongoose |
| **Auth** | [NextAuth.js](https://next-auth.js.org/) (Google Provider) |
| **Media** | [Cloudinary](https://cloudinary.com/) (Asset Hosting & Exports) |
| **AI** | [OpenRouter](https://openrouter.ai/) / OpenAI API |

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/brandforge-ai.git
cd brandforge-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variable Setup
Create a `.env.local` file in the root directory:
```env
# Database
MONGODB_URI=your_mongodb_uri

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret

# Services
OPENAI_API_KEY=your_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 🛠️ Architecture Overview

The project follows a **Hybrid Microservice Architecture** (Service-Ready):
- **/src/app/api**: Autonomous endpoints for AI generation, brand management, and design persistence.
- **/src/store**: Global state orchestrating the editor engine, history, and canvas elements.
- **/src/components**: Modular UI architecture separating the Canvas Renderer from Workspace Controls.

---

Designed with ❤️ for modern creators. 🛡️🔨

