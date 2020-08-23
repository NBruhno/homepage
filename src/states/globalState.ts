import { createGlobalState } from 'react-hooks-global-state'

import { ListTypes } from 'types/Games'

type Responsive = {
	showLogin: boolean,
	collapsedSidebar: boolean,
	darkTheme: boolean,
	isMobile: boolean,
	isLaptop: boolean,
}

type User = {
	accessToken?: string,
	displayName: string,
	email: string,
	intermediateToken?: string,
	isStateKnown: boolean,
	role?: string,
	secret?: string,
	shouldRefresh: boolean,
	twoFactorSecret?: string,
}

export type State = {
	count: number,
	responsive: Responsive,
	user: User,
	forms: Record<string, any>,
	games: {
		currentList: ListTypes,
	},
}

export const { useGlobalState } = createGlobalState<State>({
	responsive: {
		showLogin: false,
		collapsedSidebar: false,
		darkTheme: true,
		isMobile: false,
		isLaptop: false,
	},
	count: 0,
	user: {
		displayName: undefined,
		email: undefined,
		isStateKnown: false,
		accessToken: undefined,
		shouldRefresh: false,
	},

	forms: {},
	games: {
		currentList: ListTypes.Popular,
	},
})
