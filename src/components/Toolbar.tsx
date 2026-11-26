type ToolbarProps = {
  indent: string
  onIndentChange: (value: string) => void
  onOpen: () => void
  onClear: () => void
  onFormat: () => void
}

export default function Toolbar({ indent, onIndentChange, onOpen, onClear, onFormat }: ToolbarProps) {
  return (
    <div className="toolbar">
      <label className="indent-control">
        <span>Indentation</span>
        <select value={indent} onChange={event => onIndentChange(event.target.value)}>
          <option value="2">2 spaces</option>
          <option value="4">4 spaces</option>
          <option value="tab">Tabs</option>
        </select>
      </label>
      <div className="toolbar-actions">
        <button className="button secondary" onClick={onOpen}>↑ Open file</button>
        <button className="button secondary" onClick={onClear}>Clear</button>
        <button className="button primary" onClick={onFormat}>Format JSON</button>
      </div>
    </div>
  )
}
