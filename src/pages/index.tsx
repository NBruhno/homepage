import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Page from 'components/Page'

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
	<>
		<Head>
			<title>Bruhno</title>
		</Head>
		<Page>
			<h1>This is another test! - user agent: {userAgent}</h1>
			<Link href='/projects'>
				<a>Projects</a>
			</Link>
		</Page>
	</>
)

Home.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent
	return { userAgent }
}

export default Home
