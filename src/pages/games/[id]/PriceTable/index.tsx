import { sortBy } from 'lodash'

import { useGamePrices } from 'states/games'
import { useModal } from 'states/page'

import { Container } from './Container'
import { Empty } from './Empty'
import { ExpandButton } from './ExpandButton'
import { Item } from './Item'
import { Muted } from './Muted'
import { Savings } from './Savings'

const priceWithCurrency = (price: number, currency: string) => (
	new Intl.NumberFormat('en-DK', { style: 'currency', currency }).format(price)
)

export const PriceTable = () => {
	const { prices, isLoading } = useGamePrices()
	const { onOpenModal } = useModal()

	if (isLoading) return <Empty>Looking for prices...</Empty>
	if (!prices || prices.length === 0) return <Empty>There are no known prices for this game</Empty>

	const sortedPrices = sortBy(prices, [({ amount }) => amount])

	const [{ name, amount, currency, difference, url }] = sortedPrices

	return (
		<Container>
			<Item href={url} isFirst>
				<h4 css={{ margin: 0 }}>{name}</h4>
				<div css={{ alignItems: 'center', columnGap: '12px' }}>
					<span>{amount === 0 ? 'Free to play' : priceWithCurrency(amount, currency)}</span>
					<Savings difference={difference} />
				</div>
			</Item>
			{prices.length > 1 ? (
				<ExpandButton
					onClick={() => onOpenModal(
						<>
							{sortedPrices.map(({ name, amount, currency, difference, url }, index) => (
								<Item href={url} key={index}>
									<span css={{ margin: 0 }}>{name}</span>
									<div css={{ alignItems: 'center', columnGap: '12px' }}>
										<span>{amount === 0 ? 'Free to play' : priceWithCurrency(amount, currency)}</span>
										<Savings difference={difference} />
									</div>
								</Item>
							))}
						</>,
					)}
					label='Show all known prices'
				/>
			) : <Muted>There are no other known prices</Muted>}
		</Container>
	)
}
