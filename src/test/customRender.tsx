import type { RenderOptions } from '@testing-library/react'
import type { ReactNode, ReactElement } from 'react'

import { Global, ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'

import { globalCss } from 'styles/global'
import { theme } from 'styles/theme'

const Providers = ({ children }: { children?: ReactNode }) => (
	<ThemeProvider theme={theme(true)}>
		<Global styles={globalCss} />
		{children}
	</ThemeProvider>
)

const customRender = (ui: ReactElement, options: Omit<RenderOptions, 'queries'>) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }
