import { useGamePriceHistory } from 'states/games'

import { Table } from 'components/Layout'

export const PriceHistory = () => {
	const { isLoading, priceHistory } = useGamePriceHistory()

	const priceWithCurrency = (price: number, currency: string) => (
		new Intl.NumberFormat('en-DK', { style: 'currency', currency }).format(price)
	)

	if (isLoading || (priceHistory?.storeHistoricLows.length ?? 0) <= 1) return null

	return (
		<>
			<h3 css={(theme) => ({ marginTop: 0, marginBottom: '8px', color: theme.color.textSubtitle })}>Lowest historic prices</h3>
			<Table>
				<thead>
					<tr>
						<th>Store</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{priceHistory?.storeHistoricLows.map(({ currency, amount, name }) => (
						<tr>
							<td>{name}</td>
							<td>{priceWithCurrency(amount, currency)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}
