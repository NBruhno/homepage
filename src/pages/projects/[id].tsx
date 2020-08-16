import { NextPage } from 'next'
// import { useRouter } from 'next/router'
import Head from 'next/head'

import { useCounter } from 'reducers/counter'
// import { useTest } from 'reducers/test'

// import { ButtonSolid } from 'components/Buttons'
// import { Input } from 'components/Fields'
// import { Form } from 'components/Form'
// import { Card } from 'components/Card'
import { Page } from 'components/Layout/Page'

const Project: NextPage = () => {
	// const router = useRouter()
	// const { id } = router.query
	const { count } = useCounter()
	// const { testData, testLoading, testError, updateTest, deleteTest } = useTest(id)

	return (
		<>
			<Head>
				<title>Test • Bruhno</title>
			</Head>
			<Page>
				<div>
					This is a placeholder
					<p>State count: {count}</p>
				</div>
				<div>
					{/* {testLoading && <p>Loading test example...</p>}
					{testError && <p>Error loading test: {testError.message}</p>}
					{testData && (
						<Card>
							<p>{testData.title}</p>
							<Form form='updateTest' onSubmit={(fields) => updateTest(testData.id, fields)} initialValues={testData}>
								<Input label='Title' name='title' type='text' required />
								<Input label='Note' name='note' type='multiline' />
								<ButtonSolid label='Update task' submit />
							</Form>
							<ButtonSolid label='Delete task' onClick={() => deleteTest(testData.id)} />
						</Card>
					)} */}
				</div>
			</Page>
		</>
	)
}

export default Project
