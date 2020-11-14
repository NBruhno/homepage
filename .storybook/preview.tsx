import { Global, ThemeProvider } from '@emotion/react'
import { Story } from '@storybook/react'
import { themes } from '@storybook/theming'
import { useDarkMode } from 'storybook-dark-mode'

import { globalCss } from 'styles/global'
import { theme } from 'styles/theme'

const MainDecorator = (Story: Story) => {
	const darkMode = useDarkMode()

	return (
		<ThemeProvider theme={theme(darkMode)}>
			<Global styles={globalCss} />
			<Story />
		</ThemeProvider>
	)
}

export const decorators = [MainDecorator]

export const parameters = {
	backgrounds: {
		values: [
			{ name: 'dark', value: 'hsl(0, 0%, 10%)' },
			{ name: 'light', value: 'hsl(0, 0%, 100%)' },
		],
	},
	docs: {
		theme: themes.dark,
	},
}
