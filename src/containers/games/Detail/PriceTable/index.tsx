import type { Price } from 'types/Games'

import { sortBy } from 'lodash'
import { useState } from 'react'

import { ChevronFlip } from 'components/ChevronFlip'
import Collapse from 'components/Collapse'

import { Container } from './Container'
import { ExpandButton } from './ExpandButton'
import { Item } from './Item'
import { Muted } from './Muted'

type Props = {
	prices: Array<Price> | undefined,
	isLoading: boolean,
}

export const PriceTable = ({ prices, isLoading }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isLoading) return null
	if (!prices) return <Muted>Looking for prices...</Muted>

	const sortedPrices = sortBy(prices, [({ current }) => current])

	return (
		<>
			{prices?.length > 0 ? (
				<Container>
					{sortedPrices.slice(0, 1).map(({ name, current, currency, url }, index) => (
						<Item href={url} first key={`1-${index}`}>
							<h2 css={{ margin: 0 }}>{name}</h2>
							<span>{current} {currency}</span>
						</Item>
					))}
					{prices?.length > 1 ? (
						<>
							<Collapse isOpen={isExpanded} transitionTime={0.2}>
								{sortedPrices.slice(1).map(({ name, current, currency, url }, index) => (
									<Item href={url} key={`2-${index}`}>
										<span css={{ margin: 0 }}>{name}</span>
										<span>{current} {currency}</span>
									</Item>
								))}
							</Collapse>
							<ExpandButton
								onClick={() => setIsExpanded(!isExpanded)}
								label={<ChevronFlip isActive={isExpanded} />}
								title={isExpanded ? 'Show less prices' : 'Show more prices'}
							/>
						</>
					) : <Muted css={{ padding: '3px 10px 6px' }}>There are no other known prices</Muted>}
				</Container>
			) : (
				<Muted>There are no known prices for this product</Muted>
			)}
		</>
	)
}
