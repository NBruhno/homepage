import { NextPage } from 'next'
import Head from 'next/head'

import Page from 'components/Page'
import useCounter from 'reducers/useCounter'

import useTestList from 'reducers/useTestList'
import useTest from 'reducers/useTest'

const Projects: NextPage = () => {
	const { count } = useCounter()
	const [tests, testsLoading, testsError] = useTestList()
	const [test, testLoading, testError, updateTest, createTest] = useTest('hC80Jz6cY0PVFCcTRHF8')

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
				<button onClick={() => createTest()} type='button'>Create a new test</button>
				<div>
					{testsLoading && <p>Loading test list...</p>}
					{testsError && <p>Error loading tests: {testsError}</p>}
					{tests && tests.length > 0 && tests.map(({ title, id }, index: number) => (
						<div key={index}>
							<button onClick={() => updateTest(id)} type='button'>Update test</button>
							<span>{title}</span>
						</div>
					))}
				</div>
				<div>
					{testLoading && <p>Loading test example...</p>}
					{testError && <p>Error loading test: {testError}</p>}
					{test && <p>{test?.title}</p>}
				</div>
			</Page>
		</>
	)
}

export default Projects
