import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { Game, GameExtended, GamePrice } from 'types'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { getPlaiceholder } from 'plaiceholder'

import { config } from 'config.server'

import { useGame } from 'states/games'

import { fetcher } from 'lib/fetcher'
import { logger } from 'lib/logger'

import { Detail } from 'containers/games/Detail'

import { Page } from 'components/Layout/Page'

type State = {
	game: GameExtended | null,
	prices: Array<GamePrice> | null,
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
	const { game, prices, isFollowing, follow, unfollow } = useGame(query.id as string, { incomingGame: incomingGame ?? undefined, incomingPrices: incomingPrices ?? undefined })

	return (
		<>
			<Head>
				<title>{game?.name} • Bruhno</title>
			</Head>
			<Page>
				<Detail
					game={game}
					prices={prices}
					isFollowing={Boolean(isFollowing)}
					onFollow={follow}
					onUnfollow={unfollow}
				/>
			</Page>
		</>
	)
}

export default GamePage
