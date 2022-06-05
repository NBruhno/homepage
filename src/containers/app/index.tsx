import type { ReactNode } from 'react'

import { ThemeProvider } from '@emotion/react'
import { useDetectGPU } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useDarkMode } from 'states/theme'
import { useRefresh } from 'states/users'

import { GlobalStyling } from 'styles/global'
import { theme } from 'styles/theme'

import { useIsomorphicLayoutEffect } from 'lib/useIsomorphicLayoutEffect'

import { Snackbars } from 'components/Snackbars'

import { BlockWrapper } from './BlockWrapper'
import { Grid } from './Grid'
import { Header } from './Header'
import { Main } from './Main'
import { Navigation } from './Navigation'

const Nebula = dynamic(async () => {
	const component = await import('./Nebula')
	return component.Nebula
}, { ssr: false })

type Props = {
	children: ReactNode,
}

export const App = ({ children }: Props) => {
	const detectedGpu = useDetectGPU()
	const router = useRouter()
	const [isBrowserNotSupported, setIsBrowserNotSupported] = useState(false)
	const { globalTheme } = useDarkMode()
	useRefresh()

	useIsomorphicLayoutEffect(() => {
		setIsBrowserNotSupported(/Trident\/|MSIE/.test(window.navigator.userAgent))
	}, [])

	const isNebulaVisible = Boolean(router.pathname === '/' && detectedGpu.fps && detectedGpu.fps >= 30)

	return (
		<ThemeProvider theme={theme(globalTheme === 'dark')}>
			<GlobalStyling>
				{isBrowserNotSupported ? (
					<BlockWrapper>
						<div>
							<div>This browser is not supported</div>
							<p css={{ fontSize: '24px', opacity: 0.7 }}>It&apos;s unlikely that anything will break, but you should use a modern browser instead, for your own safety</p>
							<p css={{ fontSize: '14px', opacity: 0.7 }}>(and for most developers sanity, including mine)</p>
						</div>
					</BlockWrapper>
				) : (
					<Grid>
						{isNebulaVisible && <Nebula />}
						<Header />
						<Navigation />
						<Main isNebulaVisible={isNebulaVisible}>
							{children}
						</Main>
						<Snackbars />
					</Grid>
				)}
			</GlobalStyling>
		</ThemeProvider>
	)
}
