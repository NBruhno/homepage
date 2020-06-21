import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'

import { IGDBFetcher } from 'lib/fetcher'

import { Form } from 'components/Form'
import { Page } from 'components/Page'
import { GameList } from 'components/Games/List'
import { Input } from 'components/Fields'

const Games: NextPage = () => {
	const [query, setQuery] = useState(undefined)
	const { data, error } = useSWR([`/api/games`, query], (link, query) => IGDBFetcher(link, query), { revalidateOnFocus: false })

	return (
		<>
			<Head>
				<title>Games • Bruhno</title>
			</Head>
			<Page>
				<Form form='gameListQuery' onSubmit={(fields) => setQuery(fields)}>
					<Input label='Search for a game' name='search' />
				</Form>
				<GameList games={data} error={error} />
			</Page>
		</>
	)
}

export default Games
