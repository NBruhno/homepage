import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import { globalCss } from 'styles/global'
import { theme } from 'styles/theme'

import { useStore } from 'lib/store'

type Props = {
	children: React.ReactNode,
}

export const Theme = ({ children }: Props) => {
	const { state } = useStore()

	return (
		<>
			<Global styles={globalCss} />
			<ThemeProvider theme={theme(state.responsive.darkTheme ?? null)}>
				{children}
			</ThemeProvider>
		</>
	)
}
