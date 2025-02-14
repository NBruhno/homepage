import type { GlobalProvider } from '@ladle/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { useDarkMode, useLoading, useScroll } from '../src/states/page'

import { GlobalStyling } from '../src/styles/global'
import { theme } from '../src/styles/theme'

export const Provider: GlobalProvider = ({ children, globalState }) => {
	useScroll()
	useLoading(false)

	return (
		<>
			<div id='portal' />
			<ThemeProvider theme={theme(globalState.theme === 'dark')}>
				<GlobalStyling>
					<div style={{ padding: '36px' }}>{children}</div>
				</GlobalStyling>
			</ThemeProvider>
		</>
	)
}
