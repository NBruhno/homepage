import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Page from 'components/Page'
import { useState } from 'reinspect'

import useCounter from 'reducers/useCounter'

const Home: NextPage<{ userAgent?: string }> = ({ userAgent }) => {
	const { count, increment, decrement, reset } = useCounter()
	const [counter, setCounter] = useState(0, 'TESTER')

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
				<p>What is the current state count?: {count}</p>
				<button onClick={() => increment()} type='button'>+1</button>
				<button onClick={() => decrement()} type='button'>-1</button>
				<button onClick={() => reset()} type='button'>reset</button>
				<p>What is the current state count?: {counter}</p>
				<button onClick={() => setCounter(counter + 1)} type='button'>+1</button>
			</Page>
		</>
	)
}

Home.getInitialProps = async ({ req }) => ({ userAgent: req ? req.headers['user-agent'] || '' : navigator.userAgent })

export default Home
