import { create, number, type } from 'npm:superstruct@2.0.2'

const validator = type({
	id: number(),
})

export const validateIgdbRequest = async (req: Request) => {
	if (req.method !== 'POST') {
		new Response('Method not allowed', { status: 405 })
		throw new Error('405: Method not allowed')
	}
	return create(await req.json(), validator)
}
