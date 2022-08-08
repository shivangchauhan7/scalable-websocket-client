import {useReducer} from 'react'
import {v4 as uuid} from 'uuid'

function reducer(logs, action) {
  if (action.type === 'log') {
    return logs.concat({
      id: uuid(),
      content: action.content,
      createdAt: new Date(),
      level: action.level
    })
  }
  else {
    return state
  }
}

/**
 * 
 * @returns {[Array, {
 *   info: Function;
 *   warn: Function;
 *   error: Function;
 * }]}
 */
export default function useLogs() {
  const [logs, dispatch] = useReducer(reducer, [])

  const log = {
    info: (content) => {
      dispatch({type: 'log', level: 'info', content})
    },
    warn: (content) => {
      dispatch({type: 'log', level: 'warn', content})
    },
    error: (content) => {
      dispatch({type: 'log', level: 'error', content})
    }
  }
  
  return [logs, log]
}