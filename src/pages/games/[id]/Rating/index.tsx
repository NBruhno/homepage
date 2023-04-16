import { useSteamReviews } from 'states/games'

import { Placeholder } from 'components/Placeholder'
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
}

export const Rating = ({ rating, ratingCount }: Props) => {
	const { reviews, isLoading, hasReviews } = useSteamReviews()

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
				{hasReviews ? (
					<SteamContainer>
						<SteamItem href={isLoading ? '' : reviews.steam.url}>
							<Indicator rating={isLoading ? null : Math.floor((reviews.steam.recent.totalPositive / reviews.steam.recent.total) * 100)} />
							<div css={{ marginTop: '2px' }}>
								<Title>Recent</Title>
								<Placeholder isLoading={isLoading}>
									{!isLoading && reviews.steam.recent.total ? <span>{Math.floor((reviews.steam.recent.totalPositive / reviews.steam.recent.total) * 100)}%</span> : <span>None</span>}
								</Placeholder>
							</div>
						</SteamItem>
						<SteamItem href={isLoading ? '' : reviews.steam.url}>
							<Indicator rating={isLoading ? null : Math.floor((reviews.steam.total.totalPositive / reviews.steam.total.total) * 100)} />
							<div css={{ marginTop: '2px' }}>
								<Title>Total</Title>
								<Placeholder isLoading={isLoading}>
									<span>{isLoading ? 0 : Math.floor((reviews.steam.total.totalPositive / reviews.steam.total.total) * 100)}%</span>
								</Placeholder>
							</div>
						</SteamItem>
					</SteamContainer>
				) : <span css={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}>No recent reviews</span>}
			</Item>
		</Container>
	)
}
