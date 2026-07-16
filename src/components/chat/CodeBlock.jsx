import { useMemo, useState } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import markdown from 'highlight.js/lib/languages/markdown'
import java from 'highlight.js/lib/languages/java'
import go from 'highlight.js/lib/languages/go'
import sql from 'highlight.js/lib/languages/sql'
import { HiClipboard, HiCheck } from 'react-icons/hi2'
import { useToast } from '../../context/ToastContext'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('py', python)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('md', markdown)
hljs.registerLanguage('java', java)
hljs.registerLanguage('go', go)
hljs.registerLanguage('sql', sql)

export default function CodeBlock({ language, value }) {
  const { pushToast } = useToast()
  const [copied, setCopied] = useState(false)

  const highlighted = useMemo(() => {
    const code = value || ''
    try {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(code, { language }).value
      }
      return hljs.highlightAuto(code).value
    } catch {
      return hljs.highlightAuto(code).value
    }
  }, [language, value])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value || '')
      setCopied(true)
      pushToast({ type: 'success', message: 'Code copied.' })
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      pushToast({ type: 'error', message: 'Could not copy code.' })
    }
  }

  return (
    <div className="group relative my-3 overflow-hidden rounded-2xl border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 bg-ink-950/70 px-3 py-2 text-xs text-ink-300">
        <span className="font-medium uppercase tracking-wide">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition hover:bg-white/10"
        >
          {copied ? (
            <HiCheck className="h-3.5 w-3.5 text-neon-cyan" />
          ) : (
            <HiClipboard className="h-3.5 w-3.5" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto">
        <code
          className={`hljs language-${language || 'plaintext'}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  )
}
