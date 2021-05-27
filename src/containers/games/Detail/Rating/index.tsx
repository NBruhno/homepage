import { useMemo } from 'react'

import { Container } from './Container'
import { Placeholder } from './Placeholder'

type Props = {
	rating: number | null,
	isLoading: boolean,
}

export const Rating = ({ rating, isLoading }: Props) => {
	const ratingLevel = useMemo(() => {
		if (!rating) return null
		if (rating >= 66) return 'high'
		if (rating <= 33) return 'low'
		return 'normal'
	}, [rating])

	if (isLoading) return <Placeholder />

	return (
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
	)
}
