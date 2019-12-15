import fetch from 'isomorphic-unfetch'
import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Page from 'components/Page'
import useCounter from 'reducers/useCounter'
import absoluteUrl from 'lib/absoluteURL'

const Home: NextPage<{ userAgent?: string, test: [{ title: string }] }> = ({ userAgent, test }) => {
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
				{test && test.map(({ title }, index) => <div key={index}>{title}</div>)}
				<p>Global state count: {count}</p>
				{message && <p>Message: <b>{message} to {count}</b></p>}
				<button onClick={() => increment()} type='button'>+1</button>
				<button onClick={() => decrement()} type='button'>-1</button>
				<button onClick={() => reset()} type='button'>reset</button>
			</Page>
		</>
	)
}

Home.getInitialProps = async ({ req }) => {
	console.log(`${absoluteUrl(req).origin}/api/test`)
	const response = await fetch(`${absoluteUrl(req).origin}/api/test`)
	return { test: await response.json(), userAgent: req ? req.headers['user-agent'] || '' : navigator.userAgent }
}

export default Home
