import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { useSnackbar } from 'states/page'

import { Snackbar } from './Snackbar'

export const Snackbars = () => {
	const { snackbars, removeOutdatedSnackbars } = useSnackbar((state) => state, shallow)

	useEffect(() => {
		const interval = setInterval(() => removeOutdatedSnackbars(), 200)
		return () => clearInterval(interval)
	}, [snackbars, removeOutdatedSnackbars])

	return (
		<>
			{snackbars.map(({ message, type }, index) => <Snackbar isError={type === 'Alert'} key={index}>{message}</Snackbar>)}
		</>
	)
}
