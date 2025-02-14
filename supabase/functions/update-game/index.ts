import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import postgres from 'npm:postgres@3.4.5'
import { create, number, type } from 'npm:superstruct@2.0.2'

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

	const dbUrl = Deno.env.get('POSTGRES_PRISMA_URL')
	if (!dbUrl) throw new Error('DB URL is not set')

	const db = postgres(dbUrl)
	try {
		const response = await db`
			SELECT * from pgmq.send(
				queue_name => 'games-to-update',
				msg => '{ "id": ${id}}'
			);
		`
	} finally {
		db.end()
	}

	return new Response(
		JSON.stringify({
			message: `Added update request for game with ID ${id} to queue.`,
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } },
	)
})
