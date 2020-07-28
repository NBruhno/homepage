import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useGame } from 'reducers/games'
import { Page } from 'components/Pages/Layout/Page'
import { Detail } from 'components/Pages/Games/Detail'

const GamePage: NextPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { game, error, follow, unfollow } = useGame(id as string)
	const isLoading = !game

	return (
		<>
			<Head>
				<title>{game?.name ?? 'Game'} • Bruhno</title>
			</Head>
			<Page>
				<Detail game={game} error={error} isLoading={isLoading} onFollow={follow} onUnfollow={unfollow} />
			</Page>
		</>
	)
}

export default GamePage
