const getLogger = require('./get-logger')

const log = getLogger('utils/getEnv')

/**
 * Get the value of an environment variable safely.
 * 
 * Throws an error if the environment variable does not exist and a default
 * value is not given.
 * 
 * @param {string} name Name of the environment variable
 * @param {string} def Default value
 * 
 * @returns {string} The value of the environment variable
 */
function getEnv(name, def) {
  log.debug('Got arguments', {name, def})
  
  const env = process.env[name]
  const defaultGiven = !!def
  const envExists = !!env

  if (!envExists && !defaultGiven) {
    const e = new Error('No such environment variable ' + name)
    e.name = 'MissingEnvironmentVariable'

    throw e
  }

  const result = env || def

  log.debug('Returning env variable', {name, value: result})
  return result
}

module.exports = getEnv