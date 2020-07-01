import { Global } from '@emotion/core'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { useMediaQuery } from 'react-responsive'

import { globalCss } from 'styles/global'
import { theme } from 'styles/theme'

import { useStore } from 'lib/store'

type Props = {
	children: React.ReactNode,
}

export const Theme = ({ children }: Props) => {
	const { state, dispatch } = useStore()
	const systemPrefersDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' }, undefined, (darkTheme: boolean) => {
		setIsDark(darkTheme)
	})
	const [isDark, setIsDark] = useState(systemPrefersDark)

	useEffect(() => {
		dispatch({ darkTheme: isDark })
	}, [isDark])

	return (
		<>
			<Global styles={globalCss} />
			<ThemeProvider theme={theme(state.darkTheme ?? null)}>
				{children}
			</ThemeProvider>
		</>
	)
}
