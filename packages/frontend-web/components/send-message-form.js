import {useRef} from 'react'
import Button from './button'

export default function SendMessageForm(props) {
  const messageRef = useRef()
  const { disabled, sendMessage } = props

  const _sendMessage = () => {
    const messageElem = messageRef.current
    const message = messageElem.value

    sendMessage(message)
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    _sendMessage()
  }

  const onKeyUp = (e) => {
    const textarea = messageRef.current
    
    // This is a bug fix. Without this pressing escape while the textarea
    // is focused will trigger a disconnect. The disconnect is setup to happen
    // when the escape key is pressed.
    if (e.code === 'Escape') {
      e.stopPropagation()
      textarea.blur()
    }
    
    // use ctrl+enter to send message while textarea is focused
    if (e.ctrlKey && e.code === 'Enter') {
      e.preventDefault()
      _sendMessage()
    }

    // focus the textarea with ctrl+/
    if (e.ctrlKey && e.code === 'Slash') {
      e.preventDefault()
      textarea.focus()
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          <textarea
            disabled={disabled}
            id="message"
            name="message"
            placeholder={'{"key": "value"}'}
            className="disabled:cursor-not-allowed disabled:bg-slate-200 w-full"
            ref={messageRef}
            onKeyUp={onKeyUp} />
        </div>

        <div className="text-xs text-slate-400">
          Tip: Use Ctrl+Enter to send
        </div>
      </div>

      <div className="mt-5">
        <Button
          disabled={disabled}
          type="submit"
          className="bg-teal-500 border-teal-800 disabled:bg-teal-400 disabled:border-teal-800"
        >
          Send
        </Button>
      </div>
    </form>
  )
}

