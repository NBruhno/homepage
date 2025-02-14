import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { create, number, type } from 'npm:superstruct@2.0.2'

import { createAmqp } from '../createAmqp.ts'

const validator = type({
	id: number(),
})

Deno.serve(async (req) => {
	const igdbWebhookSecret = Deno.env.get('IGDB_WEBHOOK_SECRET')
	if (!igdbWebhookSecret) throw new Error(`IGDB_WEBHOOK_SECRET is not set`)
	if (req.headers.get('x-secret') !== Deno.env.get('IGDB_WEBHOOK_SECRET')) {
		return new Response('Invalid secret', { status: 401 })
	}
	const { id } = create(await req.json(), validator)

	const amqp = await createAmqp()

	try {
		const channel = await amqp.channel()

		await channel.queue(`game:delete`, { durable: true })
		await channel.basicPublish('', `game:delete`, id.toString(), {})
	} finally {
		await amqp.close()
	}

	return new Response(JSON.stringify({ message: `Added delete request for game with ID ${id} to queue.` }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	})
})
