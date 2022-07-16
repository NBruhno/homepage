import type { ReactNode } from 'react'

import { ThemeProvider } from '@emotion/react'

import { useDarkMode } from 'states/page'

import { GlobalStyling } from 'styles/global'
import { theme } from 'styles/theme'

type Props = {
	children: ReactNode,
}

export const EmotionDecorator = ({ children }: Props) => {
	const { globalTheme } = useDarkMode()

	return (
		<ThemeProvider theme={theme(globalTheme === 'dark')}>
			<GlobalStyling>
				{children}
			</GlobalStyling>
		</ThemeProvider>
	)
}
