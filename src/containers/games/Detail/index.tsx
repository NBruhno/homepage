import type { GamePrice, GameExtended } from 'types'

import { useLoading } from 'states/isLoading'
import { useResponsive } from 'states/responsive'
import { useAuth } from 'states/users'

import { ButtonSolid } from 'components/Buttons'
import { GridContainer } from 'components/Layout'
import { Placeholder } from 'components/Placeholder'
import { Tooltip, Location } from 'components/Tooltip'

import { Cover } from '../Cover'
import { dateOrYear } from '../dateOrYear'

import { Grid } from './Grid'
import { Background } from './Header/Background'
import { BackgroundPlaceholder } from './Header/BackgroundPlaceholder'
import { BackgroundWrapper } from './Header/BackgroundWrapper'
import { Developer } from './Header/Developer'
import { ReleaseDate } from './Header/ReleaseDate'
import { Title } from './Header/Title'
import { InfoBox } from './InfoBox'
import { PriceTable } from './PriceTable'
import { Rating } from './Rating'
import { SimilarGames } from './SimilarGames'
import { VideoTabs } from './VideoTabs'
import { WebsiteIcons } from './WebsiteIcons'
import { Wrapper } from './Wrapper'

type Props = {
	game: GameExtended,
	prices: Array<GamePrice> | undefined,
	isFollowing: boolean | undefined,

	onFollow: () => Promise<any>,
	onUnfollow: () => Promise<any>,
}

export const Detail = ({ game, prices, isFollowing, onFollow, onUnfollow }: Props) => {
	const { user } = useAuth()
	const { isMobile } = useResponsive()
	const { isLoading } = useLoading()

	return (
		<>
			<Wrapper>
				<BackgroundWrapper>
					{isLoading ? (
						<BackgroundPlaceholder />
					) : (
						<Background src={game.screenshot ?? game.cover ?? null} />
					)}
				</BackgroundWrapper>
			</Wrapper>
			<Grid>
				<GridContainer name='cover'>
					<Cover coverUrl={game.cover ?? null} loading='eager' imageProps={game.coverProps} css={{ maxHeight: '354px' }} />
				</GridContainer>
				<GridContainer name='headlines'>
					<Title>
						<Placeholder width='55%'>
							{game.name}
						</Placeholder>
					</Title>
					<ReleaseDate>
						<Placeholder width='30%'>
							{dateOrYear(game.releaseDate)}
						</Placeholder>
					</ReleaseDate>
					<Developer>
						<Placeholder width='25%'>
							{game.developers[0]?.name && `By ${game.developers[0].name}`}
						</Placeholder>
					</Developer>
				</GridContainer>
				<GridContainer
					name='actions'
					css={{ display: 'grid', alignItems: 'center', columnGap: '12px', gridTemplateColumns: isMobile ? 'min-content min-content' : 'min-content min-content 1fr' }}
				>
					<Tooltip tip='You need to be logged in' show={!user.accessToken} location={Location.Top}>
						<ButtonSolid
							label={isFollowing ? 'Unfollow' : 'Follow'}
							onClick={() => isFollowing ? onUnfollow() : onFollow()}
							disabled={!user.accessToken || isFollowing === undefined}
							isLoading={isLoading}
						/>
					</Tooltip>
					{!isMobile && <Rating rating={game.rating ?? null} ratingCount={game.ratingCount ?? null} />}
					{!isMobile && <WebsiteIcons websites={game.websites} />}
				</GridContainer>
				<GridContainer name='websites' shouldShow={isMobile} css={{ display: 'grid', gridTemplateColumns: 'auto 1fr', justifyContent: 'space-around' }}>
					<Rating rating={game.rating ?? null} ratingCount={game.ratingCount ?? null} />
					<WebsiteIcons websites={game.websites} />
				</GridContainer>
				<GridContainer name='priceTable'>
					<PriceTable prices={prices} />
				</GridContainer>
				<GridContainer name='info'>
					<InfoBox
						developers={game.developers}
						engines={game.engines}
						franchises={game.franchises}
						genres={game.genres}
						modes={game.modes}
						multiplayerModes={game.multiplayerModes}
						platforms={game.platforms}
						playerPerspectives={game.playerPerspectives}
						porters={game.porters}
						publishers={game.publishers}
						releaseDate={game.releaseDate ?? null}
						releaseDates={game.releaseDates}
						supporters={game.supporters}
						themes={game.themes}
					/>
				</GridContainer>
				<GridContainer name='content'>
					{(isLoading || game.summary) && (
						<>
							<h2 css={{ marginTop: '12px' }}>
								<Placeholder width='30%'>
									Summary
								</Placeholder>
							</h2>
							<p>
								<Placeholder lines={5}>
									{game.summary}
								</Placeholder>
							</p>
						</>
					)}
					{(isLoading || game.storyline) && (
						<>
							<h2>
								<Placeholder width='35%'>
									Storyline
								</Placeholder>
							</h2>
							<p>
								<Placeholder lines={5}>
									{game.storyline}
								</Placeholder>
							</p>
						</>
					)}
					{(isLoading || game.videos.length > 0) && (
						<h2>
							<Placeholder width='25%'>
								Videos
							</Placeholder>
						</h2>
					)}
					<VideoTabs videos={game.videos} />
				</GridContainer>
				<GridContainer name='similarGames'>
					<SimilarGames similarGames={game.similarGames} />
				</GridContainer>
			</Grid>
		</>
	)
}
