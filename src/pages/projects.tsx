import { NextPage } from 'next'
import Head from 'next/head'

import Page from 'components/Page'
import useCounter from 'reducers/useCounter'

const Projects: NextPage = () => {
	const { count } = useCounter()

	return (
		<>
			<Head>
				<title>Bruhno</title>
			</Head>
			<Page>
				<div>
					This is a placeholder
					<p>State count: {count}</p>
				</div>
			</Page>
		</>
	)
}

export default Projects
