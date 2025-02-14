export const validateIgdbSecret = (req: Request) => {
	const igdbWebhookSecret = Deno.env.get('IGDB_WEBHOOK_SECRET')
	if (!igdbWebhookSecret) throw new Error(`IGDB_WEBHOOK_SECRET is not set`)
	if (req.headers.get('x-secret') !== Deno.env.get('IGDB_WEBHOOK_SECRET')) {
		new Response('Invalid secret', { status: 403 })
		throw new Error('403: Invalid secret')
	}
}
