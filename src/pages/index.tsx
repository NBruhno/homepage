import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Page from 'components/Page'

import useCounter from 'reducers/useCounter'
// import useTestList from 'reducers/useTestList'
// import useTest from 'reducers/useTest'

const Home: NextPage<{ userAgent?: string }> = ({ userAgent }) => {
	const { count, message, increment, decrement, reset } = useCounter()
	// const [test, testLoading, testError] = useTest('hC80Jz6cY0PVFCcTRHF8')
	// const { tests, error, loading } = useTestList()

	// if (!loading) {
	// 	console.log(tests || error)
	// }

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
				{/* {testLoading && <p>Loading...</p>}
				{testError && <p>Error {testError}</p>}
				{test && <p>{test?.title}</p>} */}
			</Page>
		</>
	)
}

Home.getInitialProps = async ({ req }) => ({ userAgent: req ? req.headers['user-agent'] || '' : navigator.userAgent })

export default Home
