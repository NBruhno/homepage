import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useGame } from 'states/games'

import { Page } from 'components/Layout/Page'
import { Detail } from 'containers/games/Detail'

const GamePage: NextPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { game, following, follow, unfollow } = useGame(id as string)
	const isLoading = !game

	return (
		<>
			<Head>
				<title>{game?.name ?? 'Game'} • Bruhno</title>
			</Head>
			<Page>
				<Detail game={game} following={following} isLoading={isLoading} onFollow={follow} onUnfollow={unfollow} />
			</Page>
		</>
	)
}

export default GamePage
