import { ThemeProvider } from '@emotion/react'
import { useState } from 'react'

import { useDarkMode } from 'states/theme'
import { useRefresh } from 'states/users'

import { GlobalStyling } from 'styles/global'
import { theme } from 'styles/theme'

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
		<ThemeProvider theme={theme(globalTheme === 'dark')}>
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
