import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Page from 'components/Page'

import useCounter from 'reducers/useCounter'

const Home: NextPage<{ userAgent?: string }> = ({ userAgent }) => {
	const { count, message, increment, decrement, reset } = useCounter()

	return (
		<>
			<Head>
				<title>Bruhno</title>
			</Head>
			<Page>
				<h1>This is another test! {userAgent}</h1>
				<Link href='/projects'>
					<a>Projects</a>
				</Link>
				<p>Global state count: {count}</p>
				{message && <p>Message: <b>{message} to {count}</b></p>}
				<button onClick={() => increment()} type='button'>+1</button>
				<button onClick={() => decrement()} type='button'>-1</button>
				<button onClick={() => reset()} type='button'>reset</button>
			</Page>
		</>
	)
}

Home.getInitialProps = async ({ req }) => ({ userAgent: req ? req.headers['user-agent'] || '' : navigator.userAgent })

export default Home
