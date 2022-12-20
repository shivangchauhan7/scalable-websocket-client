import {useEffect, useRef} from 'react'
import Button from './button'

/**
 *
 */
export default function ConnectForm(props) {
  let buttonText = ''
  let buttonColor = ''

  const formRef = useRef()
  const inputRef = useRef()

  const { connection, connect, disconnect } = props
  const {isConnected, isConnecting, isDisconnecting} = connection
  
  // set button text
  if (!isConnected && !isConnecting && !isDisconnecting) {
    buttonText = 'Connect'
  }
  else if (isConnecting && !isConnected && !isDisconnecting) {
    buttonText = 'Connecting...'
  }
  else if (isConnected && !isConnecting && !isDisconnecting) {
    buttonText = 'Disconnect'
  }
  else if (isDisconnecting && !isConnecting) {
    buttonText = 'Disconnecting...'
  }

  // set button color
  if (isConnected && !isDisconnecting) {
    buttonColor = 'bg-red-500 border-red-800 text-white'
  }
  else if (isConnecting) {
    buttonColor = 'bg-teal-400 border-teal-800'
  }
  else if (isDisconnecting) {
    buttonColor = 'bg-red-400 border-red-800 text-white'
  }
  else {
    buttonColor = 'bg-teal-500 border-teal-800'
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!isConnected && !isConnecting) {
      const input = inputRef.current
      connect(input.value)
    }

    if (isConnected && !isDisconnecting) {
      disconnect()
    }
  }

  useEffect(() => {
    const onKeyUp = (e) => {
      const input = inputRef.current
      
      // Use "/" to focus the url input field if it isn't focused
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault()
        input.focus()
      }
    }

    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <div className="flex">
        <input
          id="wsurl"
          name="wsurl"
          type="url"
          className="disabled:bg-slate-200 disabled:cursor-not-allowed inline-block grow"
          placeholder="wss://example.com/chat"
          required
          disabled={isConnected || isConnecting || isDisconnecting}
          autoFocus={true}
          ref={inputRef}
        />
        <Button
          type="submit"
          className={`${buttonColor} border-l-0`}
          disabled={isConnecting || isDisconnecting}
        >
          { buttonText }
        </Button>
      </div>
    </form>
  )
}