import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { Game, GameExtended, GamePrice, GameSimple } from 'types'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { getPlaiceholder } from 'plaiceholder'

import { config } from 'config.server'

import { useGame } from 'states/games'

import { fetcher } from 'lib/fetcher'

import { Detail } from 'containers/games/Detail'

import { Page } from 'components/Layout/Page'

type State = {
	game: GameExtended | undefined,
	prices: Array<GamePrice> | undefined,
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { games } = await fetcher<{ games: Array<GameSimple> }>('/games?is-popular=yes', { absoluteUrl: config.staticHost })
	return {
		paths: games.map(({ id }) => ({ params: { id: id.toString() } })),
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<State> = async ({ params }) => {
	const game = await fetcher<Game | undefined>(`/games/${params?.id as string}`, { absoluteUrl: config.staticHost })
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
}

const GamePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ game, prices }) => {
	const { query } = useRouter()
	const { isFollowing, follow, unfollow } = useGame(query.id as string, game)

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
