import { create, string, type } from 'npm:superstruct@2.0.2'

const validator = type({
	authorization: string(),
})

export const authenticateSystem = (req: Request) => {
	const { authorization } = create(req.headers, validator)

	if (authorization !== `Bearer ${Deno.env.get('AUTH_SYSTEM_TOKEN')}`) {
		new Response('You do not have access to this resource', {
			status: 403,
		})
		throw new Error('403: Invalid system token')
	}
}
