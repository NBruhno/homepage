import type { Game, GamePrice } from 'types'

import { useResponsive } from 'states/responsive'
import { useAuth } from 'states/users'

import { ButtonSolid } from 'components/Buttons'
import { Placeholder } from 'components/Placeholder'
import { Tooltip, Location } from 'components/Tooltip'

import { Cover } from '../Cover'
import { dateOrYear } from '../dateOrYear'
import { groupByReleaseDate } from '../groupByReleaseDate'

import { ActionWrapper } from './ActionWrapper'
import { Background } from './Header/Background'
import { BackgroundPlaceholder } from './Header/BackgroundPlaceholder'
import { BackgroundWrapper } from './Header/BackgroundWrapper'
import { Developer } from './Header/Developer'
import { ReleaseDate } from './Header/ReleaseDate'
import { Title } from './Header/Title'
import { TitleWrapper } from './Header/TitleWrapper'
import { MainContent } from './MainContent'
import { PriceTable } from './PriceTable'
import { Rating } from './Rating'
import { SortBy, WebsiteIcons } from './WebsiteIcons'
import { Wrapper } from './Wrapper'

type Props = {
	game: Game | null,
	prices: Array<GamePrice> | undefined,
	following: boolean,
	isLoading: boolean,

	onFollow: () => Promise<any>,
	onUnfollow: () => Promise<any>,
}

export const Detail = ({ game, prices, following, onFollow, onUnfollow, isLoading }: Props) => {
	const { user } = useAuth()
	const { isMobile, isTablet, isLaptop } = useResponsive()
	const groupedReleaseDates = game?.releaseDates ? groupByReleaseDate(game.releaseDates, ({ date }) => date, game.releaseDate) : null

	return (
		<Wrapper>
			<BackgroundWrapper>
				{isLoading ? (
					<BackgroundPlaceholder />
				) : (
					<Background src={game?.screenshot ?? game?.cover ?? null} />
				)}
			</BackgroundWrapper>
			<MainContent>
				<div css={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gridColumnGap: '16px', marginBottom: '12px' }}>
					<Cover coverUrl={game?.cover ?? null} loading='eager' />
					<TitleWrapper>
						<div>
							<Title>
								<Placeholder isLoading={isLoading} width='55%'>
									{game?.name}
								</Placeholder>
							</Title>
							<ReleaseDate>
								<Placeholder isLoading={isLoading} width='30%'>
									{dateOrYear(game?.releaseDate)}
								</Placeholder>
							</ReleaseDate>
							<Developer>
								<Placeholder isLoading={isLoading} width='25%'>
									By {game?.developer?.name}
								</Placeholder>
							</Developer>
							{(isTablet || isMobile) && (
								<Rating rating={game?.rating ?? null} isLoading={isLoading} />
							)}
						</div>
						{(!isTablet && !isMobile) && (
							<>
								<ActionWrapper>
									<Tooltip tip='You need to be logged in' show={!user.accessToken} location={Location.Top}>
										<ButtonSolid
											label={following ? 'Unfollow' : 'Follow'}
											onClick={() => following ? onUnfollow() : onFollow()}
											disabled={!user.accessToken || following === undefined}
											isLoading={isLoading}
											fullWidth
										/>
									</Tooltip>
									<Rating rating={game?.rating ?? null} isLoading={isLoading} />
									{(!isTablet && !isMobile) && <WebsiteIcons websites={game?.websites ?? null} sortBy={SortBy.Stores} />}
								</ActionWrapper>
								{(!isLaptop) && (
									<PriceTable prices={prices} isLoading={isLoading} />
								)}
							</>
						)}
					</TitleWrapper>
				</div>
				{(isTablet || isMobile) && (
					<div>
						<Tooltip tip='You need to be logged in' show={!user.accessToken} location={Location.Top} css={{ display: 'grid' }}>
							<div css={{ display: 'grid', gridTemplateColumns: 'repeat(1, auto)', gridGap: '8px' }}>
								<ButtonSolid
									label={following ? 'Unfollow' : 'Follow'}
									onClick={() => following ? onUnfollow() : onFollow()}
									disabled={!user.accessToken || following === undefined}
									isLoading={isLoading}
									css={{ padding: '5px 16px' }}
								/>
							</div>
						</Tooltip>
					</div>
				)}
				{(isTablet || isMobile) && (
					<WebsiteIcons websites={game?.websites ?? null} sortBy={SortBy.Stores} />
				)}
				{(isTablet || isMobile || isLaptop) && (
					<PriceTable prices={prices} isLoading={isLoading} />
				)}
				{game?.genres && game?.genres?.length > 0 && <p>Genres: {game?.genres.join(', ')}</p>}
				{game?.platforms && game?.platforms?.length > 0 && <p>Platforms: {game?.platforms?.map(({ name }) => name).join(', ') ?? 'No known platforms'}</p>}
				{game?.summary && <h2>Summary</h2>}
				{game?.summary && <p>{game?.summary}</p>}
				{groupedReleaseDates && groupedReleaseDates?.length > 0 && <h2>Later release dates:</h2>}
				{groupedReleaseDates?.map(({ date, platforms }, index) => (
					<div key={index}>
						<p>{dateOrYear(date)}: {platforms.join(', ')}</p>
					</div>
				))}
			</MainContent>
		</Wrapper>
	)
}
