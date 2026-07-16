# Nova AI — Reusable AI Starter Template

A production-quality React + Vite starter powered by the **official Google Gemini SDK** (`@google/genai`).

Swap prompts and UI copy to ship:

- AI Chatbot
- AI Resume Analyzer
- AI Study Assistant
- AI Interview Coach
- AI Career Advisor
- AI Code Reviewer
- AI Email Assistant
- AI Project Generator
- AI Research Assistant

Built for hackathons, portfolios, and rapid AI product experiments.

---

## Features

- Premium SaaS UI with glassmorphism, dark/light mode, and smooth animations
- Landing page + full chat application shell
- Sidebar session history (persisted in `localStorage`)
- Markdown responses + syntax-highlighted code blocks
- Typing indicator, auto-scroll, copy response, clear/new chat
- Enter to send · Shift+Enter for newline
- Reusable prompt system (`src/constants/prompts.js`)
- Reusable Gemini service (`src/services/geminiService.js`)
- Toast notifications + structured error handling
- Responsive layout for mobile and desktop
- Vercel + GitHub ready

---

## Tech Stack

| Layer | Tool |
|--------|------|
| UI | React (Vite) |
| Language | JavaScript |
| Styling | Tailwind CSS |
| Icons | react-icons |
| Markdown | react-markdown + remark-gfm |
| Highlighting | highlight.js |
| AI | `@google/genai` (latest official SDK) |
| Routing | react-router-dom |

---

## Quick Start

### 1. Install

```bash
npm install
```

### 2. Configure environment

Copy the example env file and add your Gemini API key:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_MODEL=gemini-flash-latest
VITE_APP_NAME=Nova AI
VITE_APP_TAGLINE=Build any AI product on one reusable foundation
```

> If a model returns 404 / “no longer available”, switch `VITE_GEMINI_MODEL` to `gemini-flash-latest` or `gemini-3-flash-preview`.

Get a key from [Google AI Studio](https://aistudio.google.com/apikey).

### 3. Run

```bash
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### 4. Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```text
src/
├── assets/           # Logos and static assets
├── components/
│   ├── chat/         # Chat UI (bubbles, markdown, input)
│   ├── common/       # Button, toast, spinner, theme toggle
│   ├── landing/      # Landing sections
│   └── layout/       # Header, sidebar
├── constants/        # App config + reusable prompts
├── context/          # Theme, chat sessions, toasts
├── hooks/            # useChat, useAutoScroll, useLocalStorage
├── layouts/          # App shell + landing shell
├── pages/            # LandingPage, ChatPage
├── services/         # Gemini API boundary
├── styles/           # Highlight.js theme
└── utils/            # Errors, formatting, class helper
```

---

## How to Reuse for a New AI Product

1. Update branding in `src/constants/appConfig.js` (or `.env`).
2. Change the active system prompt in `src/constants/prompts.js`.
3. Optionally pick a preset from `PRODUCT_PRESETS` (resume analyzer, interview coach, etc.).
4. Tweak landing copy in `src/components/landing/`.
5. Keep `geminiService.js` untouched — it stays product-agnostic.

Example:

```js
// src/hooks/useChat.js (or pass into sendMessage)
systemInstruction: getSystemPrompt('interviewCoach')
```

---

## Screenshots

> Add screenshots after your first local run:

| Landing | Chat (Dark) | Chat (Light) |
|---------|-------------|--------------|
| `docs/landing.png` | `docs/chat-dark.png` | `docs/chat-light.png` |

Suggested capture points:

1. Landing hero
2. Empty chat with starter prompts
3. Markdown + code response
4. Sidebar with multiple sessions

---

## Deployment

### GitHub

```bash
git init
git add .
git commit -m "Initial commit: Nova AI starter template"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Never commit `.env` (already gitignored). Commit `.env.example` only.

### Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Framework preset: **Vite**.
4. Add environment variables:
   - `VITE_GEMINI_API_KEY`
   - `VITE_GEMINI_MODEL` (optional)
   - `VITE_APP_NAME` (optional)
5. Deploy.

`vercel.json` already includes SPA rewrites for client-side routing.

> **Security note:** Vite exposes `VITE_*` keys to the browser. That is acceptable for demos and hackathons. For production apps, proxy Gemini calls through a backend.

---

## Error Handling

The template maps failures into clear UX states:

| Case | Behavior |
|------|----------|
| Empty input | Toast warning, no API call |
| Missing API key | Inline error banner |
| Network failure | Toast + dismissible banner |
| API / auth failure | Actionable toast message |
| Rate limit | Retry guidance toast |
| Unexpected errors | Generic safe fallback |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |

---

## Future Improvements

- Backend proxy for API keys
- Streaming responses
- File / PDF upload for resume & research flows
- Auth + cloud-synced history
- Multi-model provider adapter
- Voice input
- Evaluation harness for prompt presets

---

## License

MIT — use freely for hackathons, portfolios, and commercial experiments.
