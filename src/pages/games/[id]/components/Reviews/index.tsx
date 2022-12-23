import type { GameReviews } from 'types'

type Props = {
	steamAppId: string | null,
	rating: number | null,
	ratingCount: number | null,
	reviews: GameReviews | null | undefined,
}

export const Reviews = ({ steamAppId, rating, ratingCount, reviews }: Props) => {
	if (!steamAppId) return null

	return (
		<>
			<h3 css={(theme) => ({ marginTop: 0, marginBottom: '4px', color: theme.color.textSubtitle })}>
				Steam reviews
			</h3>
			<a href={reviews?.steam.url}>
				{reviews?.steam.recent.scoreDescription} <span css={(theme) => ({ fontSize: theme.font.size.s70, verticalAlign: 'top', color: theme.color.textSubtitle })}>({reviews?.steam.recent.total})</span>
			</a>
		</>
	)
}
