import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Page from 'components/Page'
import useTask from 'reducers/useTask'

const Projects: NextPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { task, taskLoading, taskError } = useTask(id)

	return (
		<>
			<Head>
				<title>Tasks • Bruhno</title>
			</Head>
			<Page>
				<div>
					{taskLoading && <p>Loading test list...</p>}
					{taskError && <p>Error loading tasks: {taskError}</p>}
					{task && (
						<div>
							<h3>{task.title}</h3>
						</div>
					)}
				</div>
			</Page>
		</>
	)
}

export default Projects
