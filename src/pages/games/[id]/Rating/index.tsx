import type { GameReviews } from 'types'

import { useLoading } from 'states/page'

import { Tooltip } from 'components/Tooltip'

import { Container } from './Container'
import { Indicator } from './Indicator'
import { Item } from './Item'
import { SteamContainer } from './SteamContainer'
import { SteamItem } from './SteamItem'
import { Title } from './Title'

type Props = {
	rating: number | null,
	ratingCount: number | null,
	steamReviews: GameReviews['steam'] | null,
}

export const Rating = ({ rating, ratingCount, steamReviews }: Props) => {
	const { isLoading } = useLoading()
	if (isLoading) return null

	return (
		<Container>
			<Tooltip
				tip={ratingCount ? (
					<span>Based on {ratingCount} {ratingCount > 1 && 'different '}<b>critic rating{ratingCount && ratingCount > 1 && 's'}</b></span>
				) : (
					<span>The amount of critic ratings is unknown</span>
				)}
				show={Boolean(rating)}
			>
				<Item>
					<Title>Critic rating</Title>
					<div css={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}>
						{rating ? (
							<Indicator rating={rating} css={{ padding: '0 12px' }}>
								<span>{rating ? `${(rating / 10).toPrecision(2)}` : '0'}</span>
								<span css={(theme) => ({ fontSize: theme.font.size.s80, marginTop: '8px' })}>&nbsp;/&nbsp;10</span>
							</Indicator>
						) : (
							<span>Unrated</span>
						)}
					</div>
				</Item>
			</Tooltip>
			<Item>
				<Title>Steam reviews</Title>
				{steamReviews && steamReviews.total.total > 0 ? (
					<SteamContainer>
						<SteamItem href={steamReviews.url}>
							<Indicator rating={Math.floor((steamReviews.recent.totalPositive / steamReviews.recent.total) * 100)} />
							<div css={{ marginTop: '2px' }}>
								<Title>Recent</Title>
								{steamReviews.recent.total ? <span>{Math.floor((steamReviews.recent.totalPositive / steamReviews.recent.total) * 100)}%</span> : <span>None</span>}
							</div>
						</SteamItem>
						<SteamItem href={steamReviews.url}>
							<Indicator rating={Math.floor((steamReviews.total.totalPositive / steamReviews.total.total) * 100)} />
							<div css={{ marginTop: '2px' }}>
								<Title>Total</Title>
								<span>{Math.floor((steamReviews.total.totalPositive / steamReviews.total.total) * 100)}%</span>
							</div>
						</SteamItem>
					</SteamContainer>
				) : <span css={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}>No recent reviews</span>}
			</Item>
		</Container>
	)
}
