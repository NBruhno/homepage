import { Global } from '@emotion/core'
import { ThemeProvider, useTheme } from 'emotion-theming'

import { globalCss } from 'styles/global'
import { theme as siteTheme } from 'styles/theme'

import { useStore } from 'lib/store'

type Props = {
	children: React.ReactNode,
}

export const Theme = ({ children }: Props) => {
	const { state } = useStore()

	return (
		<>
			<ThemeProvider theme={siteTheme(state.responsive.darkTheme ?? null)}>
				<GlobalStyling>
					{children}
				</GlobalStyling>
			</ThemeProvider>
		</>
	)
}

const GlobalStyling = ({ children }: Props) => {
	const theme: Theme = useTheme()

	return (
		<>
			<Global styles={globalCss(theme)} />
			{children}
		</>
	)
}
