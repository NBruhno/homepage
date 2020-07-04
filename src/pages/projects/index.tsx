import { NextPage } from 'next'
// import Link from 'next/link'
import Head from 'next/head'

// import { useTestListActions, useTestList } from 'reducers/testList'
import { useCounter } from 'reducers/counter'
// import { useTestActions } from 'reducers/test'

// import { ButtonSolid } from 'components/Buttons'
// import { Input } from 'components/Fields'
// import { Form } from 'components/Form'
import { Card } from 'components/Card'
import { Page } from 'components/Page'

const Projects: NextPage = () => {
	const { count } = useCounter()
	// const { deleteTest } = useTestActions()
	// const { testList, testListLoading, testListError } = useTestList()
	// const { createTest } = useTestListActions()

	return (
		<>
			<Head>
				<title>Tests • Bruhno</title>
			</Head>
			<Page>
				<div>
					This is a placeholder
					<p>State count: {count}</p>
				</div>
				<Card>
					<h1>Create task</h1>
					{/* <Form form='createTest' onSubmit={(fields) => createTest(fields)}>
						<Input label='Title' name='title' type='text' required />
						<Input label='Note' name='note' type='multiline' />
						<ButtonSolid label='Create task' submit />
					</Form> */}
				</Card>
				{/* {testListLoading && <p>Loading test example...</p>}
				{testListError && <p>Error loading test: {testListError.message}</p>}
				{testList && testList.map((test: { id: string, title: string, note: string }, index) => (
					<Card key={index}>
						<p>{test.title}</p>
						<p>{test.note}</p>
						<Link href='/tests/[id]' as={`/tests/${test.id}`}>
							<a>Edit</a>
						</Link>
						<ButtonSolid label='Delete test' onClick={() => deleteTest(test.id)} />
					</Card>
				))} */}
			</Page>
		</>
	)
}

export default Projects
