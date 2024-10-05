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

	const [{ name, amount, currency, difference, url, hasStock, platform, gameName }] = sortedPrices

	return (
		<Container>
			<Item href={url} isFirst>
				<div css={{ alignItems: 'center', textAlign: 'left' }}>
					<h4 css={{ margin: 0 }}>{name}</h4>
					{platform && (
						<div css={(theme) => ({ color: theme.color.textFaded, fontSize: theme.font.size.s70, display: 'flex', alignItems: 'center', columnGap: '5px' })}>
							{(() => {
								switch (hasStock) {
									case 'yes': return <div css={(theme) => ({ height: '5px', width: '5px', marginBottom: '1px', backgroundColor: theme.color.success, borderRadius: '100%' })} />
									case 'no': return <div css={(theme) => ({ height: '5px', width: '5px', marginBottom: '1px', backgroundColor: theme.color.error, borderRadius: '100%' })} />
									default: return null
								}
							})()}
							{platform} - {gameName}
						</div>
					)}
				</div>
				<div css={{ alignItems: 'center', columnGap: '12px' }}>
					<span>{amount === 0 ? 'Free to play' : priceWithCurrency(amount, currency)}</span>
					<Savings difference={difference} />
				</div>
			</Item>
			{prices.length > 1 ? (
				<ExpandButton
					onClick={() => onOpenModal(
						<>
							{sortedPrices.map(({ name, amount, currency, difference, url, gameName, platform, hasStock }, index) => (
								<Item href={url} key={index}>
									<div css={{ alignItems: 'center', textAlign: 'left' }}>
										<span>{name}</span>
										{platform && (
											<div css={(theme) => ({ color: theme.color.textFaded, fontSize: theme.font.size.s80, display: 'flex', alignItems: 'center', columnGap: '6px' })}>
												{(() => {
													switch (hasStock) {
														case 'yes': return <div css={(theme) => ({ height: '6px', width: '6px', marginBottom: '2px', backgroundColor: theme.color.success, borderRadius: '100%' })} />
														case 'no': return <div css={(theme) => ({ height: '6px', width: '6px', marginBottom: '2px', backgroundColor: theme.color.error, borderRadius: '100%' })} />
														default: return null
													}
												})()}
												{platform} - {gameName}
											</div>
										)}
									</div>
									<div css={{ alignItems: 'center' }}>
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
