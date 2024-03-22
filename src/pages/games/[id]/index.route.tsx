import type { NextPage } from 'next'

import { isString } from 'lodash'
import { useRouter } from 'next/router'

import { useGame, useGameUserStatus } from 'states/games'
import { useTitle, useResponsive } from 'states/page'
import { useUser } from 'states/users'

import { ButtonSolid } from 'components/Buttons'
import { GridContainer } from 'components/Layout'
import { Page } from 'components/Layout/Page'
import { Placeholder } from 'components/Placeholder'
import { Tooltip } from 'components/Tooltip'

import { Cover } from '../Cover'
import { dateOrYear } from '../dateOrYear'

import { Grid } from './Grid'
import { Background } from './Header/Background'
import { BackgroundCutoff } from './Header/BackgroundCutoff'
import { BackgroundWrapper } from './Header/BackgroundWrapper'
import { Developer } from './Header/Developer'
import { ReleaseDate } from './Header/ReleaseDate'
import { Title } from './Header/Title'
import { History } from './History'
import { InfoBox } from './InfoBox'
import { News } from './News'
import { PriceHistory } from './PriceHistory'
import { PriceTable } from './PriceTable'
import { Rating } from './Rating'
import { Section } from './Section'
import { SimilarGames } from './SimilarGames'
import { VideoTabs } from './VideoTabs'
import { WebsiteIcons } from './WebsiteIcons'

const GamePage: NextPage = () => {
	const { query } = useRouter()
	const { game, isLoading } = useGame({ id: isString(query.id) ? parseInt(query.id, 10) : null })
	const { userStatus, onToggleFollowing } = useGameUserStatus()
	const accessToken = useUser((state) => state.accessToken)
	const { isMobile } = useResponsive()

	useTitle(game?.name.trim() ?? 'Game')

	return (
		<Page>
			<BackgroundWrapper>
				<Background src={game?.screenshot ?? game?.cover ?? null} imageProps={game?.screenshotProps ?? undefined} />
			</BackgroundWrapper>
			<BackgroundCutoff />
			<Grid>
				<GridContainer name='cover' css={(theme) => ({ maxHeight: '354px', [theme.mediaQueries.minTablet]: { marginTop: '10px' } })}>
					<Cover coverUrl={game?.cover ?? null} imageProps={game?.coverProps ?? undefined} isPriority />
				</GridContainer>
				<GridContainer name='headlines'>
					<header>
						<Title>
							<Placeholder width='55%'>
								{game?.name}
							</Placeholder>
						</Title>
						<ReleaseDate>
							<Placeholder width='30%'>
								{dateOrYear(game?.releaseDate)}
							</Placeholder>
						</ReleaseDate>
						<Developer>
							<Placeholder width='25%'>
								{game?.developers[0]?.name && `By ${game.developers[0].name}`}
							</Placeholder>
						</Developer>
					</header>
				</GridContainer>
				<GridContainer
					name='actions'
					css={{ display: 'flex', alignItems: 'center', columnGap: '12px', justifyContent: isMobile ? 'center' : 'flex-start' }}
				>
					<Tooltip tip='You need to be logged in' show={!accessToken}>
						<ButtonSolid
							label={userStatus?.isFollowing ? 'Unfollow' : 'Follow'}
							onClick={() => onToggleFollowing({ isFollowing: !userStatus?.isFollowing })}
							isDisabled={!accessToken || userStatus?.isFollowing === undefined}
							isLoading={isLoading}
						/>
					</Tooltip>
					{userStatus?.isInSteamLibrary && (
						<Tooltip tip='You already own this game on Steam'>
							<div css={(theme) => ({ backgroundColor: theme.color.sidebarBackground, padding: '7px 12px 3px', borderRadius: '4px' })}>
								{userStatus.timePlayed ? `${userStatus.timePlayed} hours` : 'Owned'}
							</div>
						</Tooltip>
					)}
					{!isMobile && <WebsiteIcons websites={game?.websites ?? []} />}
				</GridContainer>
				<GridContainer name='websites' shouldShow={isMobile} css={{ margin: '0 auto' }}>
					<WebsiteIcons websites={game?.websites ?? []} />
				</GridContainer>
				<GridContainer name='priceTable'>
					<PriceTable />
				</GridContainer>
				<GridContainer name='ratings'>
					<Rating rating={game?.rating ?? null} ratingCount={game?.ratingCount ?? null} />
				</GridContainer>
				<GridContainer name='info'>
					<InfoBox
						developers={game?.developers}
						engines={game?.engines}
						franchises={game?.franchises}
						genres={game?.genres}
						modes={game?.modes}
						multiplayerModes={game?.multiplayerModes}
						platforms={game?.platforms}
						playerPerspectives={game?.playerPerspectives}
						porters={game?.porters}
						publishers={game?.publishers}
						releaseDate={game?.releaseDate ?? null}
						releaseDates={game?.releaseDates}
						supporters={game?.supporters}
						themes={game?.themes}
						createdAt={game?.createdAt}
						updatedAt={game?.updatedAt}
					/>
				</GridContainer>
				<GridContainer name='content' css={{ display: 'flex', flexDirection: 'column', rowGap: '24px' }}>
					<Section contentType='other'>
						{(game?.videos.length !== 0) ? <VideoTabs videos={game?.videos} /> : null}
					</Section>
					<Section title='Summary' titlePlaceholderWidth='30%'>
						{game?.summary ?? null}
					</Section>
					<Section title='Storyline' titlePlaceholderWidth='35%'>
						{game?.storyline}
					</Section>
					<Section
						title='History'
						contentType='other'
						titlePlaceholderWidth='45%'
					>
						<History />
						<PriceHistory />
					</Section>
					<Section
						title='Latest news'
						contentType='other'
						titlePlaceholderWidth='40%'
					>
						<News />
					</Section>
				</GridContainer>
				<GridContainer name='similarGames'>
					<SimilarGames similarGames={game?.similarGames ?? []} />
				</GridContainer>
			</Grid>
		</Page>
	)
}

export default GamePage
