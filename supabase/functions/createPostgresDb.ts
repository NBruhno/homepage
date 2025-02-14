import postgres from 'npm:postgres@3.4.5'

export const createPostgresDb = async () => {
	const dbUrl = Deno.env.get('DB_URL')
	if (!dbUrl) throw new Error('DB URL is not set')

	return postgres(dbUrl)
}
