export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Nova AI'

export const APP_TAGLINE =
  import.meta.env.VITE_APP_TAGLINE ||
  'Build any AI product on one reusable foundation'

export const APP_DESCRIPTION =
  'A production-ready Gemini starter template. Swap prompts and UI to ship chatbots, advisors, coaches, and assistants in hours — not weeks.'

export const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL || 'gemini-flash-latest'

export const GEMINI_API_KEY = String(
  import.meta.env.VITE_GEMINI_API_KEY || '',
).trim()

export const MAX_TITLE_LENGTH = 42

export const FEATURE_CARDS = [
  {
    title: 'Reusable prompts',
    description:
      'Change system instructions once and redeploy as a resume analyzer, interview coach, or study assistant.',
  },
  {
    title: 'Gemini-ready',
    description:
      'Official Google Gen AI SDK with clean service boundaries, error mapping, and env-based secrets.',
  },
  {
    title: 'Premium SaaS UI',
    description:
      'Glassmorphism layouts, dark mode, markdown, code highlighting, and session history out of the box.',
  },
  {
    title: 'Hackathon-fast',
    description:
      'Opinionated architecture so you spend time on product ideas — not boilerplate.',
  },
]

export const USE_CASES = [
  'AI Chatbot',
  'Resume Analyzer',
  'Study Assistant',
  'Interview Coach',
  'Career Advisor',
  'Code Reviewer',
  'Email Assistant',
  'Project Generator',
  'Research Assistant',
]
