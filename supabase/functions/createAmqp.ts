import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { AMQPClient } from 'npm:@cloudamqp/amqp-client@3.1.1'

export const createAmqp = async () => {
	const amqpUrl = Deno.env.get('AMQP_URL')
	if (!amqpUrl) throw new Error(`AMQP_URL is not set`)
	const client = new AMQPClient(amqpUrl)
	await client.connect()

	return client
}
