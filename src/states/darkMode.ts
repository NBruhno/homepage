import { useMediaQuery } from 'react-responsive'
import { useEffect } from 'react'

import { useGlobalState } from './globalState'

export const useDarkMode = () => {
	const systemPrefersDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' }, undefined)
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
