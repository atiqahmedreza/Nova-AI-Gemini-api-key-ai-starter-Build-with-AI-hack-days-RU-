import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCodeBracket,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineLightBulb,
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from 'react-icons/hi2'

export const QUICK_TEMPLATES = [
  {
    id: 'resumeAnalyzer',
    title: 'Resume Analyzer',
    description: 'Score and rewrite bullets for impact.',
    icon: HiOutlineDocumentText,
    tone: 'emerald',
    prompt:
      'Analyze this resume bullet and rewrite it with stronger impact metrics: "Built dashboards for the operations team using React."',
  },
  {
    id: 'studyAssistant',
    title: 'Study Assistant',
    description: 'Break concepts into clear lessons.',
    icon: HiOutlineAcademicCap,
    tone: 'cyan',
    prompt:
      'Teach me the basics of neural networks in plain language with one analogy and one practice question.',
  },
  {
    id: 'interviewCoach',
    title: 'Interview Coach',
    description: 'Practice behavioral and technical rounds.',
    icon: HiOutlineUserGroup,
    tone: 'violet',
    prompt:
      'Act as an interview coach. Ask me one behavioral question for a frontend role, then wait for my answer.',
  },
  {
    id: 'codeReviewer',
    title: 'Code Reviewer',
    description: 'Find bugs, edge cases, and clarity issues.',
    icon: HiOutlineCodeBracket,
    tone: 'orange',
    prompt:
      'Review this JavaScript for bugs:\n\n```js\nfunction sum(arr) {\n  let t = 0\n  for (let i = 0; i <= arr.length; i++) t += arr[i]\n  return t\n}\n```',
  },
  {
    id: 'emailAssistant',
    title: 'Email Assistant',
    description: 'Draft polished professional emails.',
    icon: HiOutlineEnvelope,
    tone: 'pink',
    prompt:
      'Write a concise professional email requesting a project deadline extension of 3 days.',
  },
  {
    id: 'researchAssistant',
    title: 'Research Assistant',
    description: 'Summarize topics with clear takeaways.',
    icon: HiOutlineMagnifyingGlass,
    tone: 'amber',
    prompt:
      'Summarize quantum computing for a beginner: key ideas, why it matters, and common misconceptions.',
  },
]

export const PRODUCT_CARDS = [
  {
    id: 'chatbot',
    title: 'AI Chatbot',
    description: 'General-purpose assistant with markdown and code-ready replies.',
    icon: HiOutlineChatBubbleLeftRight,
    tone: 'violet',
    preview: 'chat',
    cta: 'Try Template',
  },
  {
    id: 'resumeAnalyzer',
    title: 'Resume Analyzer',
    description: 'ATS-friendly feedback with rewritten impact bullets.',
    icon: HiOutlineDocumentText,
    tone: 'emerald',
    preview: 'score',
    cta: 'Try Template',
  },
  {
    id: 'studyAssistant',
    title: 'Study Assistant',
    description: 'Step-by-step explanations with check questions.',
    icon: HiOutlineAcademicCap,
    tone: 'cyan',
    preview: 'notes',
    cta: 'Try Template',
  },
  {
    id: 'interviewCoach',
    title: 'Interview Coach',
    description: 'Timed questions, scoring, and stronger phrasing tips.',
    icon: HiOutlineBriefcase,
    tone: 'blue',
    preview: 'interview',
    cta: 'Try Template',
  },
  {
    id: 'codeReviewer',
    title: 'Code Reviewer',
    description: 'Senior-level review focused on bugs and clarity.',
    icon: HiOutlineCodeBracket,
    tone: 'orange',
    preview: 'code',
    cta: 'Try Template',
  },
  {
    id: 'projectGenerator',
    title: 'Project Generator',
    description: 'Scoped MVPs with stacks and 48-hour build plans.',
    icon: HiOutlineLightBulb,
    tone: 'magenta',
    preview: 'project',
    cta: 'Try Template',
  },
]

export const LANDING_PERKS = [
  'Reusable prompt system for 9+ AI products',
  'Official Gemini SDK with clean service layer',
  'Session history, markdown, and code highlighting',
  'Hackathon-ready architecture and premium UI',
]

export const FOOTER_POINTS = [
  { label: 'Save Time', icon: HiOutlineSparkles },
  { label: 'Hackathon Ready', icon: HiOutlineLightBulb },
  { label: 'Portfolio Grade', icon: HiOutlineBriefcase },
  { label: 'One Codebase', icon: HiOutlineCodeBracket },
]

export const TONE_STYLES = {
  violet: {
    chip: 'bg-violet-500/15 text-violet-300 border-violet-400/20',
    btn: 'from-violet-600 to-fuchsia-500',
    ring: 'shadow-[0_0_24px_rgba(139,92,246,0.25)]',
    bar: 'from-sky-400 to-violet-500',
  },
  emerald: {
    chip: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20',
    btn: 'from-emerald-600 to-teal-400',
    ring: 'shadow-[0_0_24px_rgba(52,211,153,0.22)]',
    bar: 'from-emerald-400 to-cyan-400',
  },
  cyan: {
    chip: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/20',
    btn: 'from-cyan-600 to-sky-400',
    ring: 'shadow-[0_0_24px_rgba(34,211,238,0.22)]',
    bar: 'from-cyan-400 to-blue-400',
  },
  blue: {
    chip: 'bg-sky-500/15 text-sky-300 border-sky-400/20',
    btn: 'from-sky-600 to-indigo-500',
    ring: 'shadow-[0_0_24px_rgba(56,189,248,0.22)]',
    bar: 'from-sky-400 to-indigo-400',
  },
  orange: {
    chip: 'bg-orange-500/15 text-orange-300 border-orange-400/20',
    btn: 'from-orange-500 to-amber-400',
    ring: 'shadow-[0_0_24px_rgba(251,146,60,0.22)]',
    bar: 'from-orange-400 to-amber-300',
  },
  pink: {
    chip: 'bg-pink-500/15 text-pink-300 border-pink-400/20',
    btn: 'from-pink-600 to-rose-400',
    ring: 'shadow-[0_0_24px_rgba(244,114,182,0.22)]',
    bar: 'from-pink-400 to-rose-400',
  },
  amber: {
    chip: 'bg-amber-500/15 text-amber-300 border-amber-400/20',
    btn: 'from-amber-500 to-yellow-400',
    ring: 'shadow-[0_0_24px_rgba(251,191,36,0.2)]',
    bar: 'from-amber-400 to-yellow-300',
  },
  magenta: {
    chip: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/20',
    btn: 'from-fuchsia-600 to-pink-500',
    ring: 'shadow-[0_0_24px_rgba(232,121,249,0.22)]',
    bar: 'from-fuchsia-400 to-pink-400',
  },
}
