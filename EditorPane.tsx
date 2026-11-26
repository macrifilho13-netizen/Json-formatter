import Editor from '@monaco-editor/react'
import type { ReactNode } from 'react'

type EditorPaneProps = {
  title: string
  hint: string
  value: string
  readOnly?: boolean
  theme: 'vs-dark' | 'light'
  onChange?: (value: string) => void
  footer: ReactNode
  onDropFile?: (file: File) => void
}

export default function EditorPane({ title, hint, value, readOnly = false, theme, onChange, footer, onDropFile }: EditorPaneProps) {
  return (
    <section className="editor-panel" onDragOver={event => { if (!readOnly) event.preventDefault() }} onDrop={event => {
      if (readOnly) return
      event.preventDefault()
      event.stopPropagation()
      const file = event.dataTransfer.files[0]
      if (file) onDropFile?.(file)
    }}>
      <div className="panel-head">
        <span className={`status-dot ${readOnly ? 'green' : 'blue'}`} />
        <strong>{title}</strong>
        <span className="panel-hint">{hint}</span>
      </div>
      <div className="editor-area">
        <Editor
          height="350px"
          language="json"
          theme={theme}
          value={value}
          onChange={next => onChange?.(next ?? '')}
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            padding: { top: 10, bottom: 10 },
            scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
            overviewRulerLanes: 0,
            renderLineHighlight: 'none',
          }}
        />
      </div>
      <div className="panel-foot">{footer}</div>
    </section>
  )
}
