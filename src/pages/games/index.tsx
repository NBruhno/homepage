import { NextPage } from 'next'
import Head from 'next/head'

import { useGames } from 'reducers/games'

import { Form } from 'components/Forms'
import { Page, PageContent } from 'components/Pages/Layout'
import { GameList } from 'components/Pages/Games/List'
import { Input } from 'components/Forms/Fields/Input'

const Games: NextPage = () => {
	const { games, following, error, setQuery, follow, unfollow } = useGames()

	return (
		<>
			<Head>
				<title>Games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={1300}>
					<div css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '156px' }}>
						<div>
							<h2>Recent and upcoming popular games</h2>
							<Form form='gamesQuery' onSubmit={(fields) => setQuery(fields)}>
								<Input label='Search for a game' name='search' />
							</Form>
							<GameList games={games} error={error} onFollow={follow} onUnfollow={unfollow} />
						</div>
						<div>
							<h2>Games you follow</h2>
							<Form form='followingQuery' onSubmit={(fields) => setQuery(fields)}>
								<Input label='Search among your games' name='searchFollowing' />
							</Form>
							<GameList games={following} error={error} onFollow={follow} onUnfollow={unfollow} />
						</div>
					</div>
				</PageContent>
			</Page>
		</>
	)
}

export default Games
