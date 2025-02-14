import { sortBy } from 'lodash'

import { useGamePrices } from 'states/games'
import { useModal } from 'states/page'

import { Container } from './Container'
import { Empty } from './Empty'
import { ExpandButton } from './ExpandButton'
import { Item } from './Item'
import { Muted } from './Muted'
import { Platform } from './Platform'
import { Savings } from './Savings'
import { State } from './State'

const priceWithCurrency = (price: number, currency: string) => new Intl.NumberFormat('en-DK', { style: 'currency', currency }).format(price)

export const PriceTable = () => {
	const { prices, isLoading } = useGamePrices()
	const { onOpenModal } = useModal()

	if (isLoading) return <Empty>Looking for prices...</Empty>
	if (!prices || prices.length === 0) return <Empty>There are no known prices for this game</Empty>

	const sortedPrices = sortBy(prices, [({ amount }) => amount])

	const [{ name, amount, currency, difference, url, hasStock, platform, gameName }] = sortedPrices

	return (
		<Container>
			<Item href={url} isFirst target='_blank' rel='noreferrer noopener'>
				<div style={{ alignItems: 'center', textAlign: 'left' }}>
					<h4 style={{ margin: 0 }}>{name}</h4>
					{platform && (
						<Platform>
							{(() => {
								switch (hasStock) {
									case 'yes':
										return <State state={hasStock} />
									case 'no':
										return <State state={hasStock} />
									default:
										return null
								}
							})()}
							{platform} - {gameName}
						</Platform>
					)}
				</div>
				<div style={{ alignItems: 'center', columnGap: '12px' }}>
					<span>{amount === 0 ? 'Free to play' : priceWithCurrency(amount, currency)}</span>
					<Savings difference={difference} />
				</div>
			</Item>
			{prices.length > 1 ? (
				<ExpandButton
					onClick={() =>
						onOpenModal(
							sortedPrices.map(({ name, amount, currency, difference, url, gameName, platform, hasStock }, index) => (
								<Item href={url} key={index} target='_blank' rel='noreferrer noopener'>
									<div style={{ alignItems: 'center', textAlign: 'left' }}>
										<span>{name}</span>
										{platform && (
											<Platform type='large'>
												{(() => {
													switch (hasStock) {
														case 'yes':
															return <State state={hasStock} />
														case 'no':
															return <State state={hasStock} />
														default:
															return null
													}
												})()}
												{platform} - {gameName}
											</Platform>
										)}
									</div>
									<div style={{ alignItems: 'center' }}>
										<span>{amount === 0 ? 'Free to play' : priceWithCurrency(amount, currency)}</span>
										<Savings difference={difference} />
									</div>
								</Item>
							)),
						)
					}
					label='Show all known prices'
				/>
			) : (
				<Muted>There are no other known prices</Muted>
			)}
		</Container>
	)
}
