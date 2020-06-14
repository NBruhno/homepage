import { NextPage } from 'next'
import Head from 'next/head'

import { useCounter } from 'reducers/counter'

import { Page } from 'components/Page'
import { ButtonSolid } from 'components/Buttons'

export type Props = {
	userAgent?: string,
}

const Home: NextPage<Props> = () => {
	const { count, increment, decrement, reset } = useCounter()

	return (
		<>
			<Head>
				<title>Bruhno</title>
			</Head>
			<Page>
				<p>Global state count: {count}</p>
				<ButtonSolid label='+1' onClick={() => increment()} type='button' />
				<ButtonSolid label='-1' onClick={() => decrement()} type='button' />
				<ButtonSolid label='Reset' onClick={() => reset()} type='button' />
			</Page>
		</>
	)
}

export default Home
