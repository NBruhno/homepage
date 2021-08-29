import { useMemo } from 'react'

import { Tooltip } from 'components/Tooltip'

import { Container } from './Container'
import { Placeholder } from './Placeholder'

type Props = {
	isLoading: boolean,
	rating: number | null,
	ratingCount: number | null,
}

export const Rating = ({ rating, ratingCount, isLoading }: Props) => {
	const ratingLevel = useMemo(() => {
		if (!rating) return null
		if (rating >= 66) return 'high'
		if (rating <= 33) return 'low'
		return 'average'
	}, [rating])

	if (isLoading) return <Placeholder />

	return (
		<Tooltip
			tip={ratingCount ? (
				<span>Based on {ratingCount} {ratingCount > 1 && 'different '}<b>critic rating{ratingCount && ratingCount > 1 && 's'}</b></span>
			) : (
				<span>The amount of critic ratings is unknown</span>
			)}
			show={Boolean(rating)}
		>
			<Container ratingLevel={ratingLevel}>
				{rating ? (
					<>
						<div>{rating ? `${rating.toFixed()}` : '0'}</div>
						<div>100</div>
					</>
				) : (
					<div>Unrated</div>
				)}
			</Container>
		</Tooltip>
	)
}
