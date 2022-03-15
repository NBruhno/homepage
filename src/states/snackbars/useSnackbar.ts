import type { ReactNode } from 'react'

import { differenceInMilliseconds } from 'date-fns'

import { useGlobalState } from 'states/global'

export type Snackbar = {
	actions?: Array<ReactNode>,
	createdAt: Date,
	/** In seconds, set to 0 if action is required to dismiss */
	duration?: number,
	message: ReactNode,
	type?: 'Alert' | 'Info' | 'Warning',
}

export const useSnackbar = () => {
	const [snackbars, setSnackbars] = useGlobalState('snackbars')

	const addSnackbar = (snackbar: Omit<Snackbar, 'createdAt'>) => {
		setSnackbars([...snackbars, {
			...snackbar,
			duration: snackbar.duration ?? 5,
			type: snackbar.type ?? 'Info',
			createdAt: new Date(),
		}])
	}

	const removeOutdatedSnackbars = () => {
		if (snackbars.length > 0) {
			setSnackbars(snackbars.filter(({ createdAt, duration = 5 }) => differenceInMilliseconds(new Date(), createdAt) <= duration * 1000))
		}
	}

	return { snackbars, addSnackbar, removeOutdatedSnackbars }
}
