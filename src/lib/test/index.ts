export { createCredentials } from './createCredentials'
export { createTestServer } from './createTestServer'
export { retryWrapper } from './retryWrapper'
export { fetchFromServer } from './fetchFromServer'
export * from './mockHttp'
export * from './manageUsers'

export const accessTokenMatch =
	/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiIsImtpZCI6ImVhZTdiOWEwLTZlMDQtNDhlOS1hMTliLWVhY2U5Y2JmODNhMCJ9/i
export const refreshTokenMatch =
	/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiIsImtpZCI6IjE1ZDM0YzVjLWQ3ZjMtNDMxZS04ZTQ1LTg5NTdlZjE1OGYzNSJ9/i
export const intermediateTokenMatch =
	/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiIsImtpZCI6IjYzOTBjMjI0LWZkYzktNDU5YS05Y2RlLTEwNGVjOWFmNmQ1ZiJ9/i
export const systemTokenMatch =
	/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiIsImtpZCI6ImY2YjRhMGRmLTc5YjQtNDVlZC05NzcxLWExZWUyYzZmMmE1NyJ9/i

export type TestResponse = Omit<Response, 'body' | 'headers'>
