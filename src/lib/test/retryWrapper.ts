import type { Response, Test } from 'supertest'

export const retryWrapper = async (fetchFunction: () => Test, retries: number): Promise<Response> => {
	const result = await fetchFunction()
	if (result.status >= 300) return result
	else if (retries !== 1) return retryWrapper(fetchFunction, retries - 1)
	else return result
}
