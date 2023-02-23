import type { GamePrice } from 'types'

import sortBy from 'lodash/sortBy'

import { useLoading, useModal } from 'states/page'

import { Container } from './Container'
import { Empty } from './Empty'
import { ExpandButton } from './ExpandButton'
import { Item } from './Item'
import { Muted } from './Muted'
import { Savings } from './Savings'

type Props = {
	prices: Array<GamePrice> | undefined,
}

const priceWithCurrency = (price: number, currency: string) => (
	new Intl.NumberFormat('en-DK', { style: 'currency', currency }).format(price)
)

export const PriceTable = ({ prices }: Props) => {
	const { isLoading } = useLoading()
	const { onOpenModal } = useModal()

	if (isLoading) return null
	if (!prices) return <Empty>Looking for prices...</Empty>
	if (prices.length === 0) return <Empty>There are no known prices for this game</Empty>

	const sortedPrices = sortBy(prices, [({ current }) => current])

	const [{ name, current, currency, difference, url }] = sortedPrices

	return (
		<Container>
			<Item href={url} isFirst>
				<h4 css={{ margin: 0 }}>{name}</h4>
				<div css={{ alignItems: 'center', columnGap: '12px' }}>
					<span>{current === 0 ? 'Free to play' : priceWithCurrency(current, currency)}</span>
					<Savings difference={difference} />
				</div>
			</Item>
			{prices.length > 1 ? (
				<ExpandButton
					onClick={() => onOpenModal(
						<>
							{sortedPrices.map(({ name, current, currency, difference, url }, index) => (
								<Item href={url} key={index}>
									<span css={{ margin: 0 }}>{name}</span>
									<div css={{ alignItems: 'center', columnGap: '12px' }}>
										<span>{current === 0 ? 'Free to play' : priceWithCurrency(current, currency)}</span>
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
