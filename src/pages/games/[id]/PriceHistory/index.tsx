import { useState } from 'react'

import { useGamePriceHistory } from 'states/games'

import { Table } from 'components/Layout'

import { Button } from './Button'

export const PriceHistory = () => {
	const { isLoading, priceHistory } = useGamePriceHistory()
	const [showAllPrices, setShowAllPrices] = useState(false)

	const priceWithCurrency = (price: number, currency: string) => (
		new Intl.NumberFormat('en-DK', { style: 'currency', currency }).format(price)
	)

	if (isLoading || !priceHistory?.storeHistoricLows) return null
	if (priceHistory.storeHistoricLows.length <= 1) return null

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
					{priceHistory.storeHistoricLows.slice(0, 4).map(({ currency, amount, name }) => (
						<tr>
							<td>{name}</td>
							<td>{priceWithCurrency(amount, currency)}</td>
						</tr>
					))}
					{priceHistory.storeHistoricLows.slice(4).map(({ currency, amount, name }) => (
						<tr style={{ visibility: showAllPrices ? 'visible' : 'collapse' }}>
							<td>{name}</td>
							<td>{priceWithCurrency(amount, currency)}</td>
						</tr>
					))}
					{priceHistory.storeHistoricLows.length > 4 && (
						<tr>
							<td colSpan={2} style={{ padding: 0 }}>
								<Button onClick={() => setShowAllPrices(!showAllPrices)} label='See all historic prices' />
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</>
	)
}
