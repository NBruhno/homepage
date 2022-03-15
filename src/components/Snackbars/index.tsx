import { useEffect } from 'react'

import { useSnackbar } from 'states/snackbars'

import { Snackbar } from './Snackbar'

export const Snackbars = () => {
	const { snackbars, removeOutdatedSnackbars } = useSnackbar()

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
