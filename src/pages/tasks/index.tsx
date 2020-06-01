import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { Page } from 'components/Page'
import useTask from 'reducers/useTask'
import useTasks from 'reducers/useTasks'

const Projects: NextPage = () => {
	const { tasks, tasksLoading, tasksError } = useTasks()
	const { createTask, updateTask } = useTask()

	return (
		<>
			<Head>
				<title>Tasks • Bruhno</title>
			</Head>
			<Page>
				<button onClick={() => createTask()} type='button'>Create a new test</button>
				<div>
					{tasksLoading && <p>Loading test list...</p>}
					{tasksError && <p>Error loading tasks: {tasksError}</p>}
					{tasks && tasks.length > 0 && tasks.map(({ title, id }: { title: string, id: string }, index: number) => (
						<div key={index}>
							<Link href='/tasks/[id]' as={`/tasks/${id}`}>
								<a>{title}</a>
							</Link>
							<button onClick={() => updateTask(id, { title: 'Testing tasks' })} type='button'>Update test</button>
						</div>
					))}
				</div>
			</Page>
		</>
	)
}

export default Projects
