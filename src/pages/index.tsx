import { NextPage } from 'next'
import Head from 'next/head'

import { useCounter } from 'reducers/counter'

import { Page } from 'components/Pages/Layout/Page'
import { ButtonSolid } from 'components/Buttons'

type Props = {
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
				<div css={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px' }}>
					<ButtonSolid label='+1' onClick={() => increment()} type='button' />
					<ButtonSolid label='-1' onClick={() => decrement()} type='button' />
					<ButtonSolid label='Reset' onClick={() => reset()} type='button' />
				</div>
			</Page>
		</>
	)
}

export default Home
