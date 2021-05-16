import type { RenderOptions } from '@testing-library/react'

import { Global, ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'

import { globalCss } from 'styles/global'
import { theme } from 'styles/theme'

const Providers = ({ children }: { children?: React.ReactNode }) => (
	<ThemeProvider theme={theme(true)}>
		<Global styles={globalCss} />
		{children}
	</ThemeProvider>
)

const customRender = (ui: React.ReactElement, options: Omit<RenderOptions, 'queries'>) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }
