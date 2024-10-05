'use client'

import type { ReactNode } from 'react'

import { useRouter } from 'next/router'
import { useState, useMemo } from 'react'
import { ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'

import { useDarkMode, useScroll } from 'states/page'
import { useRefresh } from 'states/users'

import { GlobalStyling } from 'styles/global'
import { theme } from 'styles/theme'

import type { Options } from 'lib/fetcher'
import { fetcher } from 'lib/fetcher'
import { useIsomorphicLayoutEffect } from 'lib/hooks'

import { Snackbars } from 'components/Snackbars'

import { BlockWrapper } from './components/BlockWrapper'
import { Grid } from './components/Grid'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Navigation } from './components/Navigation'

type Props = {
	children: ReactNode,
}

const RootLayout = ({ children }: Props) => {
	// const router = useRouter()
	const [isBrowserNotSupported, setIsBrowserNotSupported] = useState(false)
	const [isNebulaVisible, setIsNebulaVisible] = useState(false)
	// const isFrontPage = useMemo(() => Boolean(router.pathname === '/'), [router.pathname])
	const { globalTheme } = useDarkMode()
	useRefresh()
	useScroll()

	useIsomorphicLayoutEffect(() => {
		setIsBrowserNotSupported(/Trident\/|MSIE/.test(window.navigator.userAgent))
	}, [])
	// useIsomorphicLayoutEffect(() => {
	// 	setIsNebulaVisible(isFrontPage && !(window.navigator.userAgent).includes('Headless'))
	// }, [isFrontPage])

	return (
		<html lang='en'>
			<body>
				<SWRConfig
					value={{
						revalidateOnFocus: false,
						fetcher: (link: string, options?: Options) => fetcher(link, options),
					}}
				>
					<ThemeProvider theme={theme(globalTheme === 'dark')}>
						<GlobalStyling>
							{/* {isBrowserNotSupported ? (
								<BlockWrapper>
									<div>
										<div>This browser is not supported</div>
										<p style={{ fontSize: '24px', opacity: 0.7 }}>It&apos;s unlikely that anything will break, but you should use a modern browser instead, for your own safety</p>
										<p style={{ fontSize: '14px', opacity: 0.7 }}>(and for most developers sanity, including mine)</p>
									</div>
								</BlockWrapper>
							) : (
								<Grid isNebulaVisible={isNebulaVisible}>
									<Header />
									<Navigation />
									<Main isNebulaVisible={isNebulaVisible}>
										{children}
									</Main>
									<Snackbars />
								</Grid>
							)} */}
							{children}
						</GlobalStyling>
					</ThemeProvider>
				</SWRConfig>
			</body>
		</html>
	)
}

export default RootLayout 
