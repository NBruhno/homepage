import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { GameSimple, GameSimpleExtended } from 'types'

import { getPlaiceholder } from 'plaiceholder'
import { useMemo, useState } from 'react'
import { shallow } from 'zustand/shallow'

import { config } from 'config.server'

import { usePopularGamesStore } from 'states/games'
import { useTitle } from 'states/page'

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
			const { img, base64 } = game.cover ? await getPlaiceholder(game.cover) : { img: null, base64: null }
			return ({
				...game,
				coverProps: (img && base64) ? {
					...img,
					blurDataURL: base64,
				} : null,
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

const Games: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ games }) => {
	const { take, isLimitReached } = usePopularGamesStore((state) => state, shallow)
	const [skips, setSkips] = useState([0])
	useTitle('Popular games')

	const gamesToRender = useMemo(() => skips.map((skip, index) => (
		<PopularGames skip={skip} key={index} preloadedGames={index === 0 ? games : null} />
	)), [games, skips])

	return (
		<Page>
			<PageContent maxWidth={700}>
				<h2>Popular games</h2>
				{gamesToRender}
				<div css={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
					<Tooltip tip="That's all the popular games" show={isLimitReached}>
						<ButtonBorder
							label='Show more'
							isDisabled={isLimitReached}
							onClick={() => {
								if (!isLimitReached) setSkips([...skips, take * skips.length])
							}}
						/>
					</Tooltip>
				</div>
			</PageContent>
		</Page>
	)
}

export default Games
