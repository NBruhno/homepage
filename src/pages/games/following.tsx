import type { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuth } from 'states/auth'
import { useFollowingGames } from 'states/games'

import { GameList } from 'containers/games/List'

import { Page, PageContent } from 'components/Layout'

const Games: NextPage = () => {
	const { query } = useRouter()
	const { games } = useFollowingGames({ followedGamesUser: query.user ?? undefined })
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
						games={games ?? null}
						isLoading={Boolean(!games && ((user?.isStateKnown && user?.accessToken) || query.user))}
						undefinedMessage='You need to be logged in to see what games you are following'
						emptyMessage='You have not following any games yet'
					/>
				</PageContent>
			</Page>
		</>
	)
}

export default Games
