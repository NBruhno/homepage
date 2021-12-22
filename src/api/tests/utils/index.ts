export { createCredentials } from './createCredentials'
export { createTestServer } from './createTestServer'
export { retryWrapper } from './retryWrapper'
export * from './mockHttp'

export const accessTokenMatch = /eyJhbGciOiJSUzI1NiIsInR5cCI6ImFjY2VzcyJ9/i
export const intermediateTokenMatch = /eyJhbGciOiJSUzI1NiIsInR5cCI6ImludGVybWVkaWF0ZSJ9/i
export const refreshTokenMatch = /eyJhbGciOiJSUzI1NiIsInR5cCI6InJlZnJlc2gifQ/i

export type TestResponse = Omit<Response, 'body' | 'headers'>
