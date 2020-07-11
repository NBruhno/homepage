import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useGame } from 'reducers/games'
import { Page } from 'components/Pages'
import { Detail } from 'components/Games/Detail'

const GamePage: NextPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { game, error } = useGame(id)
	const isLoading = !game

	return (
		<>
			<Head>
				<title>Game • Bruhno</title>
			</Head>
			<Page>
				<Detail game={game} error={error} isLoading={isLoading} />
			</Page>
		</>
	)
}

export default GamePage
