import { useMediaQuery } from '@react-hook/media-query'
import { useEffect } from 'react'

import { useGlobalState } from 'states/global'

export type Theme = 'dark' | 'light'

export const useDarkMode = () => {
	const didSystemPreferDark = useMediaQuery('(prefers-color-scheme: dark)')
	const [globalTheme, setTheme] = useGlobalState('theme')

	const setMode = (mode: Theme) => {
		window.localStorage.setItem('theme', mode)
		setTheme(mode)
	}

	const toggleTheme = () => {
		if (globalTheme === 'light') {
			setMode('dark')
		} else {
			setMode('light')
		}
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		const localTheme = window?.localStorage?.getItem('theme') as Theme | null | undefined
		if (localTheme) setTheme(localTheme)
		else setTheme(didSystemPreferDark ? 'dark' : 'light')
	}, [])

	return { globalTheme, toggleTheme }
}
