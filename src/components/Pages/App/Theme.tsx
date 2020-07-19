import { useState, useLayoutEffect, useEffect } from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider, useTheme } from 'emotion-theming'

import { globalCss } from 'styles/global'
import { theme as siteTheme } from 'styles/theme'

import { useStore } from 'lib/store'

type Props = {
	children: React.ReactNode,
}

const GlobalStyling = ({ children }: Props) => {
	const theme: Theme = useTheme()

	return (
		<>
			<Global styles={globalCss(theme)} />
			{children}
		</>
	)
}

export const Theme = ({ children }: Props) => {
	const { state } = useStore()
	const [browserIsNotSupported, setBrowserIsNotSupported] = useState(false)
	const canUseDOM: boolean = !!(
		typeof window !== 'undefined'
		&& typeof window.document !== 'undefined'
		&& typeof window.document.createElement !== 'undefined'
	)

	const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect

	useIsomorphicLayoutEffect(() => {
		setBrowserIsNotSupported(/Trident\/|MSIE/.test(window.navigator.userAgent))
	}, [])

	return (
		<>
			<ThemeProvider theme={siteTheme(state.responsive.darkTheme ?? null)}>
				<GlobalStyling>
					{browserIsNotSupported ? (
						<div css={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: 'auto', fontSize: '42px', textAlign: 'center' }}>
							<div>
								<div>This browser is not supported</div>
								<p css={{ fontSize: '24px', opacity: 0.7 }}>It&apos;s unlikely that anything will break, but you should use a modern browser instead, for your own safety</p>
								<p css={{ fontSize: '14px', opacity: 0.7 }}>(and for most developers sanity, including mine)</p>
							</div>
						</div>
					) : children}
				</GlobalStyling>
			</ThemeProvider>
		</>
	)
}
