const getEnv = require('./get-env')

beforeEach(() => {
  process.env = {}
})

it('gets env variable', () => {
  const TEST = 'TEST'

  process.env.TEST_ENV = TEST

  expect(getEnv('TEST_ENV')).toEqual(TEST)
})

it('uses default if env variable is missing and default is given', () => {
  const defaultValue = 'default value'

  expect(getEnv('TEST_ENV', defaultValue)).toEqual(defaultValue)
})

it('throws if env variable is missing and there is no default value', () => {
  expect(() => getEnv('TEST_ENV')).toThrow()
})