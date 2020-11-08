import { useMediaQuery } from '@react-hook/media-query'
import { useEffect } from 'react'

import { useGlobalState } from './globalState'

export const useDarkMode = () => {
	const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)')
	const [globalTheme, setTheme] = useGlobalState('theme')

	const setMode = (mode: string) => {
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
		const localTheme = window.localStorage.getItem('theme')
		if (localTheme) setTheme(localTheme)
		else setTheme(systemPrefersDark ? 'dark' : 'light')
	}, [])

	return { globalTheme, toggleTheme }
}
