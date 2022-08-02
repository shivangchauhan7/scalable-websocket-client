const winston = require('winston')

const logLevel = process.env.LOG_LEVEL || 'debug'
const template = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
})

/**
 * Create a new winston logger that uses json formatting and logs to console.
 * 
 * @param {string} name Name of the logger
 * @param {any} meta Other metadata
 */
function getLogger(name, meta) {
  return template.child({
    _service: name,
    ...meta
  })
}

module.exports = getLogger