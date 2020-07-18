import { configure, addDecorator } from '@storybook/react'
import { useDarkMode } from 'storybook-dark-mode'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'

import { StoreProvider, initialState } from 'lib/store'
import { globalCss } from 'styles/global'
import { theme } from 'styles/theme'

configure(require.context('../src/components', true, /\.stories\.(tsx|mdx)?$/), module)

const ThemeWrapper = ({ children }) => (
	<ThemeProvider theme={theme(useDarkMode())}>
		{children}
	</ThemeProvider>
)

addDecorator((story) => (
	<StoreProvider>
		<ThemeWrapper>
			<>
				<Global styles={globalCss} />
				{story()}
			</>
		</ThemeWrapper>
	</StoreProvider>
))
