import type { GamePrice } from 'types'

import { sortBy } from 'lodash'

import { useLoading } from 'states/isLoading'
import { useModal } from 'states/modal'

import { Container } from './Container'
import { Empty } from './Empty'
import { ExpandButton } from './ExpandButton'
import { Item } from './Item'
import { Muted } from './Muted'

type Props = {
	prices: Array<GamePrice> | undefined,
}

const priceWithCurrency = (price: number, currency: string) => (
	new Intl.NumberFormat('en-DK', { style: 'currency', currency }).format(price)
)

export const PriceTable = ({ prices }: Props) => {
	const { isLoading } = useLoading()
	const { openModal } = useModal()

	if (isLoading) return null
	if (!prices) return <Empty>Looking for prices...</Empty>

	const sortedPrices = sortBy(prices, [({ current }) => current])

	return (
		<>
			{prices.length > 0 ? (
				<Container>
					{sortedPrices.slice(0, 1).map(({ name, current, currency, url }, index) => (
						<Item href={url} isFirst key={index}>
							<h3 css={{ margin: 0 }}>{name}</h3>
							<span>{current === 0 ? 'Free to play' : priceWithCurrency(current, currency)}</span>
						</Item>
					))}
					{prices.length > 1 ? (
						<ExpandButton
							onClick={() => openModal(
								<>
									{sortedPrices.slice(1).map(({ name, current, currency, url }, index) => (
										<Item href={url} key={index}>
											<span css={{ margin: 0 }}>{name}</span>
											<span>{current === 0 ? 'Free to play' : priceWithCurrency(current, currency)}</span>
										</Item>
									))}
								</>,
							)}
							label='Show all known prices'
						/>
					) : <Muted>There are no other known prices</Muted>}
				</Container>
			) : (
				<Empty>There are no known prices for this game</Empty>
			)}
		</>
	)
}
