import {useReducer} from 'react'
import {v4 as uuid} from 'uuid'

function reducer(conn, action) {
  switch (action.type) {
    case 'connect':
      return {
        ...conn,
        isConnecting: true,
        endpoint: action.endpoint,
      }

    case 'connected':
      return {
        ...conn,
        connection: action.connection,
        isConnected: true,
        isConnecting: false,
      }

    case 'disconnect':
      return {
        ...conn,
        isDisconnecting: true,
      }

    case 'disconnected':
      return {
        ...conn,
        connection: null,
        isConnected: false,
        isDisconnecting: false,
        endpoint: '',
      }

    case 'message':
      return {
        ...conn,
        messages: conn.messages.concat(action.message)
      }

    default:
      return conn
  }
}

/**
 * 
 * @returns {[any, Function, Function, Function]}
 */
export default function useConnection() {
  const [conn, dispatch] = useReducer(reducer, {
    connection: null,
    isConnected: false,
    isConnecting: false,
    isDisconnecting: false,
    messages: [],
    endpoint: ''
  })

  const message = (content, sentBy = 'me') => {
    dispatch({type: 'message', message: {
      id: uuid(),
      content,
      sentBy,
      sentAt: new Date()
    }})
  }

  const connect = (url, onConnected) => {
    dispatch({type: 'connect', endpoint: url})
    
    // TODO: replace with real websocket connection
    setTimeout(() => {
      dispatch({type: 'connected'})
      onConnected()
    }, Math.random() * 2000)
  }

  const disconnect = (onDisconnected) => {
    dispatch({type: 'disconnect'})

    // TODO: replace with real websocket connection
    setTimeout(() => {
      dispatch({type: 'disconnected'})
      onDisconnected()
    }, Math.random() * 2000)
  }
  
  return [conn, connect, disconnect, message]
}