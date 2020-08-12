import { Global } from '@emotion/core'
import { Story } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import { themes } from '@storybook/theming'
import { useDarkMode } from 'storybook-dark-mode'

import { StoreProvider } from 'lib/store'
import { globalCss } from 'styles/global'
import { theme } from 'styles/theme'

const MainDecorator = (Story: Story) => (
	<StoreProvider>
		<ThemeProvider theme={theme(useDarkMode())}>
			<Global styles={globalCss} />
			<Story />
		</ThemeProvider>
	</StoreProvider>
)

export const decorators = [MainDecorator]

export const parameters = {
	backgrounds: {
		values: [
			{ name: 'dark', value: 'hsl(0, 0%, 20%)' },
			{ name: 'light', value: 'hsl(0, 0%, 98%)' },
		],
	},
	docs: {
		theme: themes.dark,
	},
}
