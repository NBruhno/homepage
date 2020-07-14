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
			<ThemeProvider theme={theme(state.responsive.darkTheme ?? null)}>
				<>
					<Global styles={globalCss} />
					{children}
				</>
			</ThemeProvider>
		</>
	)
}
