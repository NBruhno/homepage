import isPropValid from '@emotion/is-prop-valid'
import type { GlobalProvider } from '@ladle/react'
import React from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { useLoading, useScroll } from '../src/states/page'
import { GlobalStyling } from '../src/styles/global'
import { theme } from '../src/styles/theme'

export const Provider: GlobalProvider = ({ children, globalState }) => {
	useScroll()
	useLoading(false)

	return (
		<>
			<div id='portal' />
			<StyleSheetManager shouldForwardProp={isPropValid}>
				<ThemeProvider theme={theme(globalState.theme === 'dark')}>
					<GlobalStyling>
						<div style={{ padding: '36px' }}>{children}</div>
					</GlobalStyling>
				</ThemeProvider>
			</StyleSheetManager>
		</>
	)
}
