import type { NextPage } from 'next'

import { config } from 'config.client'

import { useDarkMode, useTitle } from 'states/page'

import { Page } from 'components/Layout'

const Components: NextPage = () => {
	useTitle('Components')
	const { globalTheme } = useDarkMode()
	return (
		<Page>
			<iframe
				title='ladle'
				src={config.environment === 'development' ? `http://localhost:3001?theme=${globalTheme}` : `/ladle/index.html?theme=${globalTheme}`}
				style={{ inset: 0, height: '100%', width: '100%', position: 'absolute' }}
				frameBorder='0'
				allowFullScreen
			/>
		</Page>
	)
}

export default Components
