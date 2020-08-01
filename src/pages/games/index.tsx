import { NextPage } from 'next'
import Head from 'next/head'

import { useGames } from 'reducers/games'

import { Form } from 'components/Forms'
import { Page, PageContent } from 'components/Pages/Layout'
import { GameList } from 'components/Pages/Games/List'
import { Input } from 'components/Forms/Fields/Input'

const Games: NextPage = () => {
	const { games, error, setQuery, follow, unfollow } = useGames()

	return (
		<>
			<Head>
				<title>Games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<Form form='gameListQuery' onSubmit={(fields) => setQuery(fields)}>
						<Input label='Search for a game' name='search' />
					</Form>
					<GameList games={games} error={error} onFollow={follow} onUnfollow={unfollow} />
				</PageContent>
			</Page>
		</>
	)
}

export default Games
