import { useMemo, useState } from 'react'

import { useGamePriceHistory, useGamePrices } from 'states/games'

import { ButtonToggle } from 'components/Buttons'
import { Table } from 'components/Layout'

import { Button } from './Button'

export const PriceHistory = () => {
	const { isLoading: isPriceHistoryLoading, priceHistory } = useGamePriceHistory()
	const { isLoading: isPriceLoading, prices } = useGamePrices()
	const [showAllPrices, setShowAllPrices] = useState(false)
	const [showInactiveStores, setShowInactiveStores] = useState(false)
	const isLoading = isPriceHistoryLoading || isPriceLoading

	const priceWithCurrency = (price: number, currency: string) => (
		new Intl.NumberFormat('en-DK', { style: 'currency', currency }).format(price)
	)

	const historyToShow = useMemo(() => {
		if (isLoading || !priceHistory?.storeHistoricLows) return null
		if (showInactiveStores) return priceHistory.storeHistoricLows
		const relevantHistory = priceHistory.storeHistoricLows
			.filter((historicPrice) => prices?.some((currentPrice) => currentPrice.name === historicPrice.name))
			.map((historicPrice) => ({
				...historicPrice,
				url: prices?.find((currentPrice) => currentPrice.name === historicPrice.name)?.url,
			}))
		return relevantHistory
	}, [isLoading, prices, priceHistory?.storeHistoricLows, showInactiveStores])

	if (!historyToShow) return null

	return (
		<>
			<h3 css={(theme) => ({ marginTop: 0, marginBottom: '8px', color: theme.color.textSubtitle })}>Lowest historic prices</h3>
			<ButtonToggle
				options={[
					{ label: 'Active stores', value: false },
					{ label: 'Inactive stores', value: true },
				]}
				initialValue={false}
				onValueChange={setShowInactiveStores}
				css={{
					marginBottom: '12px',
				}}
			/>
			<Table>
				<thead>
					<tr>
						<th>Store</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{historyToShow.slice(0, historyToShow.length === 5 ? 5 : 4).map(({ currency, amount, name }, index) => (
						<tr key={index}>
							<td>{name}</td>
							<td>{priceWithCurrency(amount, currency)}</td>
						</tr>
					))}
					{historyToShow.length > 4 && historyToShow.slice(4).map(({ currency, amount, name }, index) => (
						<tr key={index} style={{ visibility: showAllPrices ? 'visible' : 'collapse' }}>
							<td>{name}</td>
							<td>{priceWithCurrency(amount, currency)}</td>
						</tr>
					))}
					{historyToShow.length > 5 && (
						<tr>
							<td colSpan={2} style={{ padding: 0 }}>
								<Button
									onClick={() => setShowAllPrices(!showAllPrices)}
									label={showAllPrices ? 'Do not show all historic prices' : 'Show all historic prices'}
								/>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</>
	)
}
