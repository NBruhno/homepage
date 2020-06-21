import useSWR from 'swr'
import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { IGDBFetcher } from 'lib/fetcher'

import { Page } from 'components/Page'
import { Detail } from 'components/Games/Detail'

const GamePage: NextPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { data, error } = useSWR(id ? `/api/games/${id}` : null, IGDBFetcher, { revalidateOnFocus: false })
	const isLoading = !data

	console.log(data)

	return (
		<>
			<Head>
				<title>Game • Bruhno</title>
			</Head>
			<Page>
				<Detail game={data} error={error} isLoading={isLoading} />
			</Page>
		</>
	)
}

export default GamePage
