import type { ReactNode } from 'react'

import { differenceInMilliseconds } from 'date-fns'
import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

export type Snackbar = {
	actions?: Array<ReactNode>,
	createdAt: Date,
	/** In seconds, set to 0 if action is required to dismiss */
	duration?: number,
	message: ReactNode,
	type?: 'Alert' | 'Info' | 'Warning',
}

type SnackbarState = {
	snackbars: Array<Snackbar>,
	addSnackbar: (snackbar: Omit<Snackbar, 'createdAt'>) => void,
	removeOutdatedSnackbars: () => void,
}

export const useSnackbar = createWithEqualityFn<SnackbarState>()(devtools((set, state) => ({
	snackbars: [],
	addSnackbar: ({ duration, type, ...rest }) => set({
		snackbars: [
			...state().snackbars,
			{
				...rest,
				duration: duration ?? 5,
				type: type ?? 'Info',
				createdAt: new Date(),
			},
		],
	}, false, 'addSnackbar'),
	removeOutdatedSnackbars: () => {
		const { snackbars } = state()
		if (snackbars.length > 0) {
			set({
				snackbars: snackbars.filter(({ createdAt, duration = 5 }) => differenceInMilliseconds(new Date(), createdAt) <= duration * 1000),
			}, false, 'removeOutdatedSnackbars')
		}
	},
}), { anonymousActionType: 'useSnackbar' }), shallow)
