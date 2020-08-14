import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'

import { StoreProvider } from 'lib/store'
import { globalCss } from 'styles/global'
import { theme } from 'styles/theme'

const Providers = ({ children }: { children: React.ReactNode }) => (
	<StoreProvider>
		<ThemeProvider theme={theme(true)}>
			<Global styles={globalCss} />
			{children}
		</ThemeProvider>
	</StoreProvider>
)

const customRender = (ui: React.ReactElement, options: Omit<RenderOptions, 'queries'>) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }
