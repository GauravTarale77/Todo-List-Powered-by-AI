📋 AI-Powered Todo List

A modern to‑do list application that leverages AI (via CopilotKit) for smart tasks and suggestions.

🧩 Overview
This project is a Next.js/TypeScript-based to‑do app enhanced with AI functionality:

Create, update, delete, and complete tasks.

AI-driven task suggestions and helpers via OpenAI/CopilotKit.

Clean, modular structure: frontend in public/, main app logic under app/, utility functions in lib/utils.ts, reusable UI components, and voice/text input capabilities.

🛠️ Tech Stack
Framework: Next.js

Language: TypeScript

AI: CopilotKit (OpenAI-powered)

API Endpoints: /app/api/copilotkit/route.ts

Utils: Under lib/utils.ts

Components: Modular React components

Styling: (Add your CSS/SCSS/styling method here)

Environment Variables: Stored in .env (not committed)

📦 Installation
1. Clone the repo:
   git clone https://github.com/GauravTarale77/Todo-List-Powered-by-AI.git
   cd Todo-List‑Powered‑by‑AI

2. Install dependencies:
   npm install

3. Create a .env file based on .env.example (you should add this):
   OPENAI_API_KEY=your_openai_api_key
   CUSTOM_BACKEND_URL=if_any

4. Run the development server:
   npm run dev

5. Open http://localhost:3000 in your browser.

🔧 Usage & Features
Add tasks manually or via AI-generated suggestions.

Edit, delete, or mark tasks as complete.

AI prompts: Enter natural-language commands (e.g., “remind me tomorrow at noon to call mom”) and let CopilotKit parse and add tasks accordingly.

Voice input: (If implemented) talk to the app — CopilotKit transcribes and creates tasks automatically.


📁 Project Structure

/
├── public/                    # Static assets
├── app/
│   └── api/copilotkit/route.ts   # AI + task endpoints
├── components/                # Reusable UI components
├── lib/
│   └── utils.ts               # Helper functions
├── .env.example               # Template for env vars (exclude `.env`)
├── package.json
└── README.md
