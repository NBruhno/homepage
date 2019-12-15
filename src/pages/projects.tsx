import { NextPage } from 'next'
import Head from 'next/head'

import Page from 'components/Page'
import useCounter from 'reducers/useCounter'

// import useTestList from 'reducers/useTestList'
import useTest from 'reducers/useTest'

const Projects: NextPage = () => {
	const { count } = useCounter()
	// const { tests, error, loading } = useTestList()
	const [test, testLoading, testError] = useTest('hC80Jz6cY0PVFCcTRHF8')

	// if (!loading) {
	// 	console.log(tests || error)Promise<any[]>
	// }

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
				{testLoading && <p>Loading...</p>}
				{testError && <p>Error {testError}</p>}
				{test && <p>{test?.title}</p>}
			</Page>
		</>
	)
}

export default Projects
