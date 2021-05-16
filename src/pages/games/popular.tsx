import type { NextPage } from 'next'

import Head from 'next/head'

import { useGames } from 'states/games'

import { GameList } from 'containers/games/List'

import { Page, PageContent } from 'components/Layout'

const Games: NextPage = () => {
	const { popular } = useGames()

	return (
		<>
			<Head>
				<title>Games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<h2>Popular games</h2>
					<GameList
						games={popular ?? null}
						isLoading={!popular}
						undefinedMessage='There appears to be an issue with games list'
						emptyMessage='Could not find any popular games at the moment'
					/>
				</PageContent>
			</Page>
		</>
	)
}

export default Games
