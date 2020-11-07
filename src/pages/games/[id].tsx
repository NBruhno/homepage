import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useGame } from 'states/games'

import { Detail } from 'containers/games/Detail'

import { Page } from 'components/Layout/Page'

const GamePage: NextPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { game, prices, following, follow, unfollow } = useGame(id as string)
	const isLoading = !game

	return (
		<>
			<Head>
				<title>{game?.name ?? 'Game'} • Bruhno</title>
			</Head>
			<Page>
				<Detail game={game} prices={prices} following={following} isLoading={isLoading} onFollow={follow} onUnfollow={unfollow} />
			</Page>
		</>
	)
}

export default GamePage
