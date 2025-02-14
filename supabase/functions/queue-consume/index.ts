import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { authenticateSystem } from '../authenticateSystem.ts'
import { createPostgresDb } from '../createPostgresDb.ts'

Deno.serve(async (req) => {
	authenticateSystem(req)

	try {
		const db = await createPostgresDb()

		try {
			const response = await db`
				SELECT * from pgmq.read(
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
