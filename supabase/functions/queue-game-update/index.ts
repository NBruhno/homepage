import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createPostgresDb } from '../createPostgresDb.ts'
import { validateIgdbRequest } from '../validateIgdbRequest.ts'
import { validateIgdbSecret } from '../validateIgdbSecret.ts'

Deno.serve(async (req) => {
	validateIgdbSecret(req)
	const { id } = await validateIgdbRequest(req)

	try {
		const db = await createPostgresDb()

		try {
			const response = await db`
				SELECT * from pgmq.send(
					'games-to-update',
					${db.json({ id })}
				);
			`
			console.log(`Added update request for game with ID ${id} to queue.`)
		} catch (error) {
			console.error(`Failed to add update request for ID ${id} to queue`)
			throw error
		} finally {
			await db.end()
		}

		return new Response(
			JSON.stringify({
				message: `Added update request for game with ID ${id} to queue.`,
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		)
	} catch (error) {
		new Response(
			JSON.stringify({
				message: 'An unknown error occurred',
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } },
		)
		throw error
	}
})
