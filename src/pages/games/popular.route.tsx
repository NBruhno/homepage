import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { GameSimple, GameSimpleExtended } from 'types'

import { useRouter } from 'next/router'
import { getPlaiceholder } from 'plaiceholder'

import { config } from 'config.server'

import { usePopularGames } from 'states/games'
import { useLoading, useTitle } from 'states/page'

import { fetcher } from 'lib/fetcher'
import { logger } from 'lib/logger'

import { ButtonBorder } from 'components/Buttons'
import { Page, PageContent } from 'components/Layout'
import { Tooltip } from 'components/Tooltip'

import { PopularGames } from './Lists'

type State = {
	games: Array<GameSimpleExtended> | null,
}

export const getStaticProps: GetStaticProps<State> = async () => {
	try {
		const { games } = await fetcher<{ games: Array<GameSimple>, skip: number, take: number, before: GameSimple | null, after: GameSimple | null }>(`/games?is-popular=yes`, { absoluteUrl: config.staticHost })
		const extendedGames = await Promise.all(games.map(async (game): Promise<GameSimpleExtended> => {
			if (game.cover) {
				const image = await fetch(game.cover).then(async (res) => Buffer.from(await res.arrayBuffer()))
				const { metadata, base64 } = game.cover ? await getPlaiceholder(image) : { metadata: null, base64: null }
				return ({
					...game,
					coverProps: (metadata && base64) ? {
						...metadata,
						blurDataURL: base64,
					} : null,
				})
			}
			return ({
				...game,
				coverProps: null,
			})
		}))

		return {
			props: {
				games: extendedGames,
			},
			revalidate: 60 * 10, // in seconds
		}
	} catch (error) {
		logger.error(error)

		return {
			props: {
				games: null,
			},
		}
	}
}

const Games: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ games: preloadedGames }) => {
	const { games, isLoading, setSize, size, isLimitReached } = usePopularGames(preloadedGames ? { games: preloadedGames, before: null, after: null, skip: 0, take: 50 } : undefined)
	useTitle('Popular games')
	useLoading(false)
	const router = useRouter()

	return (
		<Page>
			<PageContent maxWidth={700}>
				<h2>Popular games</h2>
				{games ? games.map(({ games }, index) => (
					<PopularGames games={games} isLoading={isLoading} key={index} />
				)) : null}
				<div css={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
					<Tooltip tip="That's all the popular games" show={isLimitReached}>
						<ButtonBorder
							label='Show more'
							isDisabled={isLimitReached}
							onClick={async () => {
								await setSize(size + 1)
								await router.push({ query: { pages: size + 1 } }, undefined, { shallow: true })
							}}
						/>
					</Tooltip>
				</div>
			</PageContent>
		</Page>
	)
}

export default Games
