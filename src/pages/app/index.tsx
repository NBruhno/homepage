import isPropValid from '@emotion/is-prop-valid'
import { Snackbars } from 'components/Snackbars'
import type { Options } from 'lib/fetcher'
import { fetcher } from 'lib/fetcher'
import { useIsomorphicLayoutEffect } from 'lib/hooks'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { useDarkMode, useScroll } from 'states/page'
import { useRefresh } from 'states/users'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { GlobalStyling } from 'styles/global'
import { theme } from 'styles/theme'
import { SWRConfig } from 'swr'
import { BlockWrapper } from './BlockWrapper'
import { Grid } from './Grid'
import { Header } from './Header'
import { Main } from './Main'
import { Navigation } from './Navigation'

type Props = {
	children: ReactNode
}

export const App = ({ children }: Props) => {
	const router = useRouter()
	const [isBrowserNotSupported, setIsBrowserNotSupported] = useState(false)
	const [isNebulaVisible, setIsNebulaVisible] = useState(false)
	const isFrontPage = useMemo(() => Boolean(router.pathname === '/'), [router.pathname])
	const { globalTheme } = useDarkMode()
	useRefresh()
	useScroll()

	useIsomorphicLayoutEffect(() => {
		setIsBrowserNotSupported(/Trident\/|MSIE/.test(window.navigator.userAgent))
	}, [])
	useIsomorphicLayoutEffect(() => {
		setIsNebulaVisible(isFrontPage && !window.navigator.userAgent.includes('Headless'))
	}, [isFrontPage])

	return (
		<SWRConfig
			value={{
				revalidateOnFocus: false,
				fetcher: (link: string, options?: Options) => fetcher(link, options),
			}}
		>
			<StyleSheetManager shouldForwardProp={isPropValid}>
				<ThemeProvider theme={theme(globalTheme === 'dark')}>
					<GlobalStyling>
						{isBrowserNotSupported ? (
							<BlockWrapper>
								<div>
									<div>This browser is not supported</div>
									<p style={{ fontSize: '24px', opacity: 0.7 }}>
										It&apos;s unlikely that anything will break, but you should use a modern browser instead, for your own safety
									</p>
									<p style={{ fontSize: '14px', opacity: 0.7 }}>(and for most developers sanity, including mine)</p>
								</div>
							</BlockWrapper>
						) : (
							<Grid isNebulaVisible={isNebulaVisible}>
								<Header />
								<Navigation />
								<Main isNebulaVisible={isNebulaVisible}>{children}</Main>
								<Snackbars />
							</Grid>
						)}
					</GlobalStyling>
				</ThemeProvider>
			</StyleSheetManager>
		</SWRConfig>
	)
}
