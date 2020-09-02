import { ThemeProvider } from 'emotion-theming'
import { useState } from 'react'

import { GlobalStyling } from 'styles/global'
import { theme as siteTheme } from 'styles/theme'

import { useDarkMode } from 'states/darkMode'
import { useRefresh } from 'states/refresh'

import { useIsomorphicLayoutEffect } from 'lib/useIsomorphicLayoutEffect'

import { BlockWrapper } from './BlockWrapper'
import { Grid } from './Grid'
import { Header } from './Header'
import { Main } from './Main'
import { Navigation } from './Navigation'

type Props = {
	children: React.ReactNode,
}

export const App = ({ children }: Props) => {
	const [browserIsNotSupported, setBrowserIsNotSupported] = useState(false)
	const { globalTheme } = useDarkMode()
	useRefresh()

	useIsomorphicLayoutEffect(() => {
		setBrowserIsNotSupported(/Trident\/|MSIE/.test(window.navigator.userAgent))
	}, [])

	return (
		<ThemeProvider<Theme> theme={siteTheme(globalTheme === 'dark')}>
			<GlobalStyling>
				{browserIsNotSupported ? (
					<BlockWrapper>
						<div>
							<div>This browser is not supported</div>
							<p css={{ fontSize: '24px', opacity: 0.7 }}>It&apos;s unlikely that anything will break, but you should use a modern browser instead, for your own safety</p>
							<p css={{ fontSize: '14px', opacity: 0.7 }}>(and for most developers sanity, including mine)</p>
						</div>
					</BlockWrapper>
				) : (
					<Grid>
						<Header />
						<Navigation />
						<Main>
							{children}
						</Main>
					</Grid>
				)}
			</GlobalStyling>
		</ThemeProvider>
	)
}
