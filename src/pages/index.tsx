import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import useSWR from 'swr'

import fetcher from 'lib/fetcher'
import { Page } from 'components/Page'
import useCounter from 'reducers/useCounter'
import { ButtonSolid } from 'components/Buttons'

import { config } from 'config'

export type Props = {
	userAgent?: string,
}

const Home: NextPage<Props> = ({ userAgent }) => {
	const { count, message, increment, decrement, reset } = useCounter()
	const { data: test, error } = useSWR('/api/tests', fetcher)

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
				<Link href='/test'>
					<a>Test</a>
				</Link>
				<a href={config.environment === 'development' ? 'http://localhost:9000' : `/storybook/index.html`}>Storybook</a>
				{!error && test && test.map(({ title }: { title: string }, index: number) => <div key={index}>{title}</div>)}
				<p>Global state count: {count}</p>
				<ButtonSolid label='+1' onClick={() => increment()} type='button' />
				<ButtonSolid label='-1' onClick={() => decrement()} type='button' />
				<ButtonSolid label='Reset' onClick={() => reset()} type='button' />
				{message && <p>Message: <b>{message} to {count}</b></p>}
			</Page>
		</>
	)
}

Home.getInitialProps = async ({ req }) => ({ userAgent: req ? req.headers['user-agent'] || '' : navigator.userAgent })

export default Home
