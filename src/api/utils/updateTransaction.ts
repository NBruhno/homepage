import { getActiveTransaction } from '@sentry/tracing'

type Props = {
	data?: Array<{
		label: string,
		value: any,
	}>,
	name?: string,
}

/** Updates the transaction in the current scope of Sentry with more/modified data */
export const updateTransaction = ({ data = [], name }: Props) => {
	const transaction = getActiveTransaction()

	if (transaction) {
		if (data.length > 0) {
			data.forEach(({ label, value }) => {
				transaction.setData(label, value)
			})
		}

		if (name) transaction.setName(name)
	}
}
