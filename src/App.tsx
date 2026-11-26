import { useCallback, useEffect, useRef, useState } from 'react'
import EditorPane from './components/EditorPane'
import Toolbar from './components/Toolbar'

type ThemeMode = 'dark' | 'light'

// Keep parsing errors readable
function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'The JSON could not be parsed'
}

export default function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [indent, setIndent] = useState('2')
  const [theme, setTheme] = useState<ThemeMode>(() => localStorage.getItem('json-formatter-theme') === 'light' ? 'light' : 'dark')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [dragging, setDragging] = useState(false)
  const picker = useRef<HTMLInputElement>(null)
  const noticeTimer = useRef<number | undefined>(undefined)

  // Format JSON using the selected indentation
  const format = useCallback((value: string) => {
    const spacing = indent === 'tab' ? '\t' : Number(indent)
    return JSON.stringify(JSON.parse(value), null, spacing)
  }, [indent])

  // Show short action feedback
  const notify = (message: string) => {
    setNotice(message)
    window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setNotice(''), 2600)
  }

  // Persist the selected color theme
  useEffect(() => {
    localStorage.setItem('json-formatter-theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Format valid input after a short pause
  useEffect(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }
    const timer = window.setTimeout(() => {
      try {
        setOutput(format(input))
        setError('')
      } catch {
        // Keep the previous result until the user requests validation
      }
    }, 500)
    return () => window.clearTimeout(timer)
  }, [input, format])

  useEffect(() => () => window.clearTimeout(noticeTimer.current), [])

  // Validate and format on demand
  const formatNow = () => {
    if (!input.trim()) {
      setOutput('')
      setError('Enter JSON or load a .json file to get started')
      return
    }
    try {
      setOutput(format(input))
      setError('')
      notify('JSON formatted successfully')
    } catch (reason) {
      setOutput('')
      setError(getErrorMessage(reason))
      notify('Invalid JSON — check the input')
    }
  }

  // Read a local JSON file without uploading it
  const loadFile = (file?: File) => {
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.json') && file.type !== 'application/json' && file.type !== 'text/plain') {
      setError('Please choose a .json file')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : ''
      setInput(content)
      setError('')
      try {
        setOutput(format(content))
      } catch {
        setOutput('')
      }
    }
    reader.onerror = () => setError('The selected file could not be read')
    reader.readAsText(file)
    if (picker.current) picker.current.value = ''
  }

  // Copy the formatted result
  const copyOutput = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      notify('Formatted JSON copied')
    } catch {
      notify('Clipboard access is unavailable')
    }
  }

  // Download the formatted result
  const downloadOutput = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'formatted.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    if (picker.current) picker.current.value = ''
  }

  return (
    <main className="shell" onDragEnter={event => { if (event.dataTransfer.types.includes('Files')) setDragging(true) }} onDragLeave={event => { if (event.currentTarget === event.target) setDragging(false) }}>
      <header className="topline">
        <div className="intro">
          <h1>JSON Formatter</h1>
          <p>Format and validate JSON online.</p>
        </div>
        <div className="head-actions">
          <span className="local-status"><i />Processed locally</span>
          <button className="button secondary theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☼ Light mode' : '☾ Dark mode'}
          </button>
        </div>
      </header>

      <section className={`workspace ${dragging ? 'is-dragging' : ''}`} onDragOver={event => event.preventDefault()} onDrop={event => {
        event.preventDefault()
        setDragging(false)
        loadFile(event.dataTransfer.files[0])
      }}>
        <Toolbar indent={indent} onIndentChange={setIndent} onOpen={() => picker.current?.click()} onClear={clearAll} onFormat={formatNow} />
        <input ref={picker} className="visually-hidden" type="file" accept=".json,application/json" onChange={event => loadFile(event.target.files?.[0])} />
        <div className="editor-grid">
          <EditorPane
            title="INPUT JSON"
            hint="Paste or drop a .json file"
            value={input}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            onChange={value => { setInput(value); setError('') }}
            onDropFile={loadFile}
            footer={<><span>{input.length} characters</span><button className="text-button" onClick={() => picker.current?.click()}>Choose file</button></>}
          />
          <EditorPane
            title="FORMATTED RESULT"
            hint={error ? 'Invalid JSON' : output ? 'Ready' : 'Waiting for valid JSON'}
            value={output}
            readOnly
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            footer={<><span>{error ? error : output ? `${output.length} characters` : 'No output yet'}</span><div className="output-actions"><button className="text-button" disabled={!output} onClick={copyOutput}>Copy</button><button className="text-button" disabled={!output} onClick={downloadOutput}>Download</button></div></>}
          />
        </div>
        {error && <p className="error-message" role="alert">{error}</p>}
      </section>

      <details className="seo-guide">
        <summary>JSON formatting guide and frequently asked questions</summary>
        <div className="guide-content">
          <h2>How to format JSON</h2>
          <p>Paste JSON into the input editor or open a local .json file. The formatter automatically formats valid JSON after a short pause. Choose two spaces, four spaces or tabs to control indentation.</p>
          <h2>How JSON validation works</h2>
          <p>JSON is parsed in your browser. Select Format JSON to validate the input and display a parsing error if the content is invalid.</p>
          <h2>Are my files uploaded?</h2>
          <p>No. File reading, parsing and formatting happen locally in your browser. The tool does not send the JSON content to an application server.</p>
        </div>
      </details>

      <footer className="site-footer">
        <span>Free online JSON formatting tool</span>
        <a className="coffee-link" href="https://www.buymeacoffee.com/YOUR_USERNAME" target="_blank" rel="noreferrer" aria-label="Support this tool on Buy Me a Coffee">
          <img src="/buy-me-a-coffee.png" alt="Buy me a coffee" />
        </a>
      </footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  )
}
