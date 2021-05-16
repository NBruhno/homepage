import type { NextPage } from 'next'

import Head from 'next/head'

import { useAuth } from 'states/auth'
import { useGames } from 'states/games'

import { GameList } from 'containers/games/List'

import { Page, PageContent } from 'components/Layout'

const Games: NextPage = () => {
	const { following } = useGames()
	const { user } = useAuth()

	return (
		<>
			<Head>
				<title>Games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<h2>Followed games</h2>
					<GameList
						games={following ?? null}
						isLoading={Boolean(!following && user?.accessToken)}
						undefinedMessage='You need to be logged in to see what games you are following'
						emptyMessage='You have not following any games yet'
					/>
				</PageContent>
			</Page>
		</>
	)
}

export default Games
