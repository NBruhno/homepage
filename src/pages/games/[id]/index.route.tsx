import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { Game, GameExtended, GamePrice, GameSimple } from 'types'

import { useRouter } from 'next/router'
import { getPlaiceholder } from 'plaiceholder'

import { config } from 'config.server'

import { useGame } from 'states/games'
import { useLoading, useTitle, useResponsive } from 'states/page'
import { useUser } from 'states/users'

import { fetcher } from 'lib/fetcher'
import { logger } from 'lib/logger'

import { ButtonSolid } from 'components/Buttons'
import { GridContainer } from 'components/Layout'
import { Page } from 'components/Layout/Page'
import { Placeholder } from 'components/Placeholder'
import { Tooltip } from 'components/Tooltip'

import { Cover } from '../Cover'
import { dateOrYear } from '../dateOrYear'

import { Grid } from './components/Grid'
import { Background } from './components/Header/Background'
import { BackgroundWrapper } from './components/Header/BackgroundWrapper'
import { Developer } from './components/Header/Developer'
import { ReleaseDate } from './components/Header/ReleaseDate'
import { Title } from './components/Header/Title'
import { InfoBox } from './components/InfoBox'
import { News } from './components/News'
import { PriceTable } from './components/PriceTable'
import { Rating } from './components/Rating'
import { SimilarGames } from './components/SimilarGames'
import { VideoTabs } from './components/VideoTabs'
import { WebsiteIcons } from './components/WebsiteIcons'
import { Wrapper } from './components/Wrapper'

type State = {
	game: GameExtended | null,
	prices: Array<GamePrice> | null,
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { games } = await fetcher<{ games: Array<GameSimple> }>('/games?is-popular=yes&take=10', { absoluteUrl: config.staticHost })
	return {
		paths: games.map(({ id }) => ({ params: { id: id.toString() } })),
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<State> = async ({ params }) => {
	if (!params?.id) {
		return {
			props: {
				game: null,
				prices: null,
			},
		}
	}

	try {
		const game = await fetcher<Game | undefined>(`/games/${params.id as string}`, { absoluteUrl: config.staticHost })
		if (!game) return { notFound: true }
		const [{ prices }, { img: coverProps, base64: coverBlurUrl }, { img: screenshotProps, base64: screenshotBlurUrl }, ...similarGames] = await Promise.all([
			await fetcher<{ prices: Array<GamePrice> }>(`/games/${game.id}/prices?name=${encodeURIComponent(game.name)}`, { absoluteUrl: config.staticHost }),
			game.cover ? getPlaiceholder(game.cover) : { img: null, base64: null },
			game.screenshot ? getPlaiceholder(game.screenshot) : { img: null, base64: null },
			...game.similarGames.map(async (game) => {
				if (!game.cover) {
					return {
						...game,
						coverProps: null,
					}
				}
				const { img, base64 } = await getPlaiceholder(game.cover)

				return ({
					...game,
					coverProps: {
						...img,
						blurDataURL: base64,
					},
				})
			}),
		])

		return {
			props: {
				game: {
					...game,
					coverProps: (coverProps && coverBlurUrl) ? {
						...coverProps,
						blurDataURL: coverBlurUrl,
					} : null,
					screenshotProps: (screenshotProps && screenshotBlurUrl) ? {
						...screenshotProps,
						blurDataURL: screenshotBlurUrl,
					} : null,
					similarGames,
				},
				prices,
			},
			revalidate: 60 * 10, // in seconds
		}
	} catch (error) {
		logger.error(error)
		return {
			props: {
				game: null,
				prices: null,
			},
		}
	}
}

const GamePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ game: incomingGame, prices: incomingPrices }) => {
	const { query } = useRouter()
	const { game, prices, gameNews, isFollowing, isInSteamLibrary, onFollow, onUnfollow } = useGame({ id: query.id as string, initialGame: incomingGame ?? undefined, initialPrices: incomingPrices ?? undefined })
	const accessToken = useUser((state) => state.accessToken)
	const { isMobile } = useResponsive()
	const { isLoading } = useLoading()

	useTitle(game?.name.trim() ?? 'Game')

	return (
		<Page>
			<Wrapper>
				<BackgroundWrapper>
					<Background src={game?.screenshot ?? game?.cover ?? null} imageProps={game?.screenshotProps ?? undefined} />
				</BackgroundWrapper>
			</Wrapper>
			<Grid>
				<GridContainer name='cover'>
					<Cover
						coverUrl={game?.cover ?? null}
						css={{ maxHeight: '354px' }}
						imageProps={game?.coverProps ?? undefined}
						isPriority
					/>
				</GridContainer>
				<GridContainer name='headlines'>
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
				</GridContainer>
				<GridContainer
					name='actions'
					css={{ display: 'flex', alignItems: 'center', columnGap: '12px', justifyContent: isMobile ? 'center' : 'flex-start' }}
				>
					<Tooltip tip='You need to be logged in' show={!accessToken}>
						<ButtonSolid
							label={isFollowing ? 'Unfollow' : 'Follow'}
							onClick={() => isFollowing ? onUnfollow() : onFollow()}
							isDisabled={!accessToken || isFollowing === undefined}
							isLoading={isLoading}
						/>
					</Tooltip>
					<Rating rating={game?.rating ?? null} ratingCount={game?.ratingCount ?? null} />
					{isInSteamLibrary && (
						<Tooltip tip='You already own this game on Steam'>
							<div css={(theme) => ({ backgroundColor: theme.color.sidebarBackground, padding: '5px 16px', borderRadius: '4px' })}>
								In library
							</div>
						</Tooltip>
					)}
					{!isMobile && <WebsiteIcons websites={game?.websites ?? []} />}
				</GridContainer>
				<GridContainer name='websites' shouldShow={isMobile} css={{ margin: '0 auto' }}>
					<WebsiteIcons websites={game?.websites ?? []} />
				</GridContainer>
				<GridContainer name='priceTable'>
					<PriceTable prices={prices} />
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
						lastCheckedAt={game?.lastCheckedAt ?? null}
						updatedAt={game?.updatedAt}
					/>
				</GridContainer>
				<GridContainer name='content'>
					{(isLoading || game?.summary) && (
						<>
							<h2 css={{ marginTop: '12px' }}>
								<Placeholder width='30%'>
									Summary
								</Placeholder>
							</h2>
							<p>
								<Placeholder lines={5}>
									{game?.summary}
								</Placeholder>
							</p>
						</>
					)}
					{(isLoading || game?.storyline) && (
						<>
							<h2>
								<Placeholder width='35%'>
									Storyline
								</Placeholder>
							</h2>
							<p>
								<Placeholder lines={5}>
									{game?.storyline}
								</Placeholder>
							</p>
						</>
					)}
					{(isLoading || (game?.videos && game.videos.length > 0)) && (
						<h2>
							<Placeholder width='25%'>
								Videos
							</Placeholder>
						</h2>
					)}
					<VideoTabs videos={game?.videos} />
					<h2>
						<Placeholder width='25%'>
							Latest news
						</Placeholder>
					</h2>
					<News gameNews={gameNews} />
				</GridContainer>
				<GridContainer name='similarGames'>
					<SimilarGames similarGames={game?.similarGames ?? []} />
				</GridContainer>
			</Grid>
		</Page>
	)
}

export default GamePage
