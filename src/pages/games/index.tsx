import { NextPage } from 'next'
import Head from 'next/head'

import { useGames } from 'reducers/games'

import { Form } from 'components/Forms'
import { Page } from 'components/Pages/Layout/Page'
import { GameList } from 'components/Games/List'
import { Input } from 'components/Forms/Fields/Input'

const Games: NextPage = () => {
	const { games, error, setQuery } = useGames()

	return (
		<>
			<Head>
				<title>Games • Bruhno</title>
			</Head>
			<Page>
				<Form form='gameListQuery' onSubmit={(fields) => setQuery(fields)}>
					<Input label='Search for a game' name='search' />
				</Form>
				<GameList games={games} error={error} />
			</Page>
		</>
	)
}

export default Games
