import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import Editor from '@monaco-editor/react';
type ThemeMode='dark'|'light';
const errText=(e:unknown)=>e instanceof Error?e.message:'The JSON could not be parsed.';
export default function App(){
 const [input,setInput]=useState(''),[output,setOutput]=useState(''),[indent,setIndent]=useState('2');
 const [theme,setTheme]=useState<ThemeMode>(()=>localStorage.getItem('json-formatter-theme')==='light'?'light':'dark');
 const [error,setError]=useState(''),[notice,setNotice]=useState(''),[dragging,setDragging]=useState(false);
 const picker=useRef<HTMLInputElement>(null),toastTimer=useRef<number|undefined>(undefined);
 const format=useCallback((s:string)=>JSON.stringify(JSON.parse(s),null,indent==='tab'?'\\t':Number(indent)),[indent]);
 const notify=(s:string)=>{setNotice(s);clearTimeout(toastTimer.current);toastTimer.current=window.setTimeout(()=>setNotice(''),3500)};
 useEffect(()=>{localStorage.setItem('json-formatter-theme',theme);document.documentElement.dataset.theme=theme},[theme]);
 useEffect(()=>{if(!input.trim()){setOutput('');setError('');return}const t=setTimeout(()=>{try{setOutput(format(input));setError('')}catch{}},500);return()=>clearTimeout(t)},[input,format]);
 useEffect(()=>()=>clearTimeout(toastTimer.current),[]);
 const formatNow=()=>{if(!input.trim()){setError('Enter JSON or load a .json file to get started.');setOutput('');return}try{setOutput(format(input));setError('');notify('JSON formatted successfully')}catch(e){setError(errText(e));notify('Invalid JSON — check the input')}};
 const load=(file?:File)=>{if(!file)return;if(!file.name.toLowerCase().endsWith('.json')&&file.type!=='application/json'&&file.type!=='text/plain'){setError('Please choose a .json file.');return}const reader=new FileReader();reader.onload=()=>{const text=typeof reader.result==='string'?reader.result:'';setInput(text);try{setOutput(JSON.stringify(JSON.parse(text),null,indent==='tab'?'\\t':Number(indent)));setError('');notify(`Loaded ${file.name}`)}catch(e){setOutput('');setError(errText(e));notify('File loaded, but it contains invalid JSON')}};reader.onerror=()=>setError('The selected file could not be read.');reader.readAsText(file)};
 const copy=async()=>{if(!output)return;try{await navigator.clipboard.writeText(output);notify('Formatted JSON copied')}catch{notify('Clipboard access was blocked by your browser')}};
 const download=()=>{if(!output)return;const u=URL.createObjectURL(new Blob([output],{type:'application/json;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='formatted.json';a.click();URL.revokeObjectURL(u);notify('Download started')};
 const opts=useMemo(()=>({automaticLayout:true,minimap:{enabled:false},fontSize:13,lineNumbers:'on' as const,scrollBeyondLastLine:false,wordWrap:'on' as const,tabSize:indent==='tab'?4:Number(indent),insertSpaces:indent!=='tab',folding:true,padding:{top:14,bottom:14},scrollbar:{verticalScrollbarSize:9,horizontalScrollbarSize:9}}),[indent]);
 return <main className="shell" id="top">
 <header className="topline"><section className="intro"><h1>JSON Formatter</h1><p>Format and validate JSON online.</p></section><div className="head-actions"><span className="privacy-label"><i/>Processed locally</span><button className="theme-toggle" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?'☼ Light mode':'☾ Dark mode'}</button></div></header>
 <div className="ad-slot ad-slot-top" aria-label="Advertisement"></div>
 <section className="workspace"><div className="toolbar"><div className="indent"><label htmlFor="indent">Indentation</label><select id="indent" value={indent} onChange={e=>setIndent(e.target.value)}><option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tabs</option></select></div><div className="actions"><button className="btn quiet" onClick={()=>picker.current?.click()}>↑ Open file</button><input ref={picker} className="hidden" type="file" accept=".json,application/json,text/plain" onChange={e=>load(e.target.files?.[0])}/><button className="btn quiet" onClick={()=>{setInput('');setOutput('');setError('')}}>Clear</button><button className="btn primary" onClick={formatNow}>Format JSON</button></div></div>
 <div className="editors">
 <section className={`editor ${dragging?'dragging':''}`} onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setDragging(false)}} onDrop={e=>{e.preventDefault();setDragging(false);load(e.dataTransfer.files?.[0])}}><div className="panel-head"><b><i className="blue"/>INPUT JSON</b><span>Paste or drop a .json file</span></div>{dragging&&<div className="drop-overlay"><strong>Drop your JSON file</strong><small>Opened locally in your browser</small></div>}<Editor height="440px" language="json" theme={theme==='dark'?'vs-dark':'light'} value={input} onChange={v=>setInput(v??'')} options={opts}/><div className="panel-foot"><span>{input.length.toLocaleString()} characters</span><button onClick={()=>picker.current?.click()}>Choose file</button></div></section>
 <section className="editor"><div className="panel-head"><b><i className="green"/>FORMATTED RESULT</b><span>{output?'Ready':'Waiting for valid JSON'}</span></div><Editor height="440px" language="json" theme={theme==='dark'?'vs-dark':'light'} value={output} options={{...opts,readOnly:true,domReadOnly:true}}/><div className="panel-foot"><span>{output?`${output.length.toLocaleString()} characters`:'No output yet'}</span><div><button disabled={!output} onClick={copy}>Copy</button><button disabled={!output} onClick={download}>Download</button></div></div></section></div>
 <div className="ad-slot ad-slot-bottom" aria-label="Advertisement"></div>
 {error&&<div className="error" role="alert"><b>Unable to format JSON</b><p>{error}</p><button onClick={()=>setError('')}>×</button></div>}</section>
 <details className="seo-guide">
 <summary>JSON formatting guide and frequently asked questions</summary>
 <div className="guide-content">
 <h2>How to format JSON</h2><p>Paste JSON into the input editor or open a local .json file. Choose an indentation style and select Format JSON. The formatted result appears in the output editor, where it can be copied or downloaded.</p>
 <h3>What does a JSON formatter do?</h3><p>A JSON formatter organizes data with consistent indentation and line breaks, making objects, arrays and nested values easier to read. It also checks whether the input follows JSON syntax.</p>
 <h3>How can I validate JSON?</h3><p>Enter JSON and select Format JSON. Valid content is formatted; invalid content produces a parsing error so you can inspect and correct it.</p>
 <h3>Is my JSON uploaded?</h3><p>No. Formatting and validation run locally in your browser. JSON content is not sent to this website's server.</p>
 <h3>Can I format a JSON file?</h3><p>Yes. Use Open file or drag and drop a .json file onto the input editor. You can then format, copy or download the result.</p>
 </div></details>
 <footer><span>Free online JSON formatting tool</span><a className="coffee-link" href="https://www.buymeacoffee.com/YOUR_USERNAME" target="_blank" rel="noreferrer" aria-label="Buy me a coffee — support this tool"><img src="/buy-me-a-coffee.png" alt="Buy me a coffee" /></a></footer>
 {notice&&<div className="toast" role="status">{notice}</div>}</main>
}