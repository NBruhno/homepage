import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Page from 'components/Page'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'

import firebase from 'lib/firebase'
import useCounter from 'reducers/useCounter'

const Home: NextPage<{ userAgent?: string }> = ({ userAgent }) => {
	const { count, message, increment, decrement, reset } = useCounter()
	const [document, loading, error] = useDocument(
		firebase.firestore().doc('test/hC80Jz6cY0PVFCcTRHF8'),
	)

	const [collection, loading1, error1] = useCollection(
		firebase.firestore().collection('test'),
	)

	console.log('document loading:', loading)
	console.log('document error:', error)
	console.log('document value:', document)
	console.log('collection loading:', loading1)
	console.log('collection error:', error1)
	console.log('collection value:', collection)

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
