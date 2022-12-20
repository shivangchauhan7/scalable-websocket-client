export default function MessageInspector(props) {
  const {message} = props

  if (!message) {
    return null
  }
  
  return (
    <pre className="bg-slate-200 py-1 px-2 text-xs max-h-64 overflow-auto whitespace-pre-wrap">
      {message && message.content}
    </pre>
  )
}