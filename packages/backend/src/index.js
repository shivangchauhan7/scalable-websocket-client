const env = require('dotenv')
const path = require('path')
const express = require('express')

const getEnv = require('./utils/get-env')
const getLogger = require('./utils/get-logger')

const log = getLogger('app')

// load config from .env file
const NO_PATH = 'NO_PATH'
const envPath = path.resolve(__dirname, getEnv('ENV_PATH', NO_PATH))
if (envPath != NO_PATH) {
  log.info('Loading config...', {path: envPath})
  const result = env.config({path: envPath})

  if (result.error) {
    log.error('Failed to load config', {path: envPath})
    throw result.error
  }
}

// start app
const app = express()
const port = parseInt(getEnv('PORT'))

log.info('Starting server...')
app.listen(port, (e) => {
  if (e) {
    log.error('Failed to listen on port ' + port)
    throw e
  }

  log.info('Listening on port ' + port)
})