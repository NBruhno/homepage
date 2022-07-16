import type { NextPage } from 'next'

import { useTitle } from 'states/page'

export const NotFound: NextPage = () => {
	useTitle('404')

	return (
		<div css={{ margin: 'auto', textAlign: 'center' }}>
			<h1 css={{ marginBottom: 0, fontSize: '4.5em' }}>404</h1>
			<p css={{ marginTop: 0 }}>resource not found</p>
		</div>
	)
}

export default NotFound
