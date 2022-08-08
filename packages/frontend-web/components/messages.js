export default function Messages(props) {
  const {messages} = props
  
  return (
    <div className="grow flex flex-col-reverse overflow-auto">
      <div>
        {
          messages.map((message, i) => {
            const {sentBy, content, sentAt} = message
            const textDirection = sentBy === 'me' ? 'text-right' : 'text-left'
            const bgColor = sentBy === 'me' ? 'bg-teal-500' : 'bg-none'

            return (
              <div key={i} className={'mb-2 ' + textDirection}>
                <span className={'border-gray-500 border-[1px] py-1 px-2 inline-block max-w-md ' + bgColor}>
                  {content}
                </span>
                <div>
                  <small className="text-xs text-slate-400">
                    {sentAt.toLocaleString()}
                  </small>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}