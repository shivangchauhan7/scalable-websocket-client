import {useEffect, useState} from 'react'

import useLogs from '../hooks/use-logs'
import useConnection from '../hooks/use-conn'

import H from '../components/h'
import Log from '../components/log-list-item'
import List from '../components/list'
import Message from '../components/message-list-item'
import Connect from '../components/connect-form'
import SendMessage from '../components/send-message-form'
import MessageInspector from '../components/message-inspector'

function HomePage() {
  const [logs, log] = useLogs()
  const [conn, connect, disconnect, message] = useConnection()

  const [selectedMessage, selectMessage] = useState(null)
  const [displayInspector, setDisplayInspector] = useState(false)

  const _connect = (url) => {
    log.info('Connecting to ' + url)
    connect(url, () => {
      log.info('Connected to ' + url)
    })
  }

  const _disconnect = () => {
    log.info('Disconnecting from ' + conn.endpoint)
    disconnect(() => {
      log.info('Disconnected from ' + conn.endpoint)
    })
  }

  const sendMessage = (content) => {
    if (!conn.isConnected) {
      log.warn('Trying to send message while disconnected')
      return
    }
    
    log.info('Sending message...')

    message(content)

    setTimeout(() => {
      message('echo: ' + content, 'server')
    }, Math.random() * 1000)
  }
  
  const inspectMessage = (message) => {
    selectMessage(message)

    if (message === null) {
      // message was deselected or there is no message
      setDisplayInspector(false)
    }
    else {
      setDisplayInspector(true)
    }
  }

  useEffect(() => {
    const onKeyUp = (e) => {
      if (e.code === 'Escape' && conn.isConnected) {
        e.preventDefault()
        _disconnect()
      }
    }
    
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [conn])

  return (
    <main className="flex">
      <div className="grow h-screen flex flex-col">
        <div className="bg-white p-5">
          <H>Connect</H>
          <Connect connection={conn} connect={_connect} disconnect={_disconnect}/>
        </div>

        <div className="bg-white p-5 mt-1">
          <H>Connection Settings</H>
        </div>

        <div className="mt-1 p-5 bg-white grow">
          <H>Send Websocket Message</H>
          <SendMessage disabled={!conn.isConnected} sendMessage={sendMessage} />
        </div>
      </div>

      <div className="ml-1 grow h-screen flex flex-col max-w-2xl w-full">
        <div className="bg-white p-5 grow">
          <H className="ml-2">Messages</H>
          <List Item={Message} items={conn.messages} onSelect={inspectMessage} />
        </div>

        <div className={'mt-1 p-5 bg-white ' + (displayInspector ? 'block' : 'hidden')}>
          <H className="hover:cursor-pointer ml-2">Inspect Message</H>
          <MessageInspector message={selectedMessage} />
        </div>
      </div>

      <div className="ml-1 bg-white p-5 h-screen max-w-2xl w-full flex flex-col">
        <H className="ml-2">Logs</H>
        <List items={logs} Item={Log} />
      </div>
    </main>
  )
}

export default HomePage