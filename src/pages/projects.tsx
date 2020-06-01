import { NextPage } from 'next'
import Head from 'next/head'

import { Page } from 'components/Page'
import useCounter from 'reducers/useCounter'

import useTestList from 'reducers/useTestList'
import useTest from 'reducers/useTest'

import { ButtonSolid } from 'components/Buttons'
import { Card } from 'components/Card'

const Projects: NextPage = () => {
	const { count } = useCounter()
	const [tests, testsLoading, testsError] = useTestList()
	const [test, testLoading, testError, updateTest, createTest, deleteTest] = useTest('hC80Jz6cY0PVFCcTRHF8')

	return (
		<>
			<Head>
				<title>Projects • Bruhno</title>
			</Head>
			<Page>
				<div>
					This is a placeholder
					<p>State count: {count}</p>
				</div>
				<ButtonSolid label='Create a new test' onClick={() => createTest()} />
				<div>
					{testsLoading && <p>Loading test list...</p>}
					{testsError && <p>Error loading tests: {testsError}</p>}
					{tests && tests.length > 0 && tests.map(({ title, id }: { title: string, id: string }, index: number) => (
						<Card key={index}>
							<ButtonSolid label='Update test' onClick={() => updateTest(id)} />
							<ButtonSolid label='Delete test' onClick={() => deleteTest(id)} />
							<span>{title}</span>
						</Card>
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
