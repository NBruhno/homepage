import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import { StateInspector } from 'reinspect'
import { Global } from '@emotion/core'

import { StoreProvider, initialState } from 'lib/store'
import globalCss from 'styles/global'
import { theme } from 'styles/theme'

configure([
	require.context('../src/components', true, /\.stories\.tsx?$/),
], module)

addDecorator((story) => (
	<StateInspector initialState={{ GLOBAL: { ...initialState } }} name='Bruhno'>
		<Global styles={globalCss} />
		<StoreProvider>
			<ThemeProvider theme={theme}>
				{story()}
			</ThemeProvider>
		</StoreProvider>
	</StateInspector>
))
