import { createGlobalState } from 'react-hooks-global-state'

import { ListTypes } from 'types/Games'

type Responsive = {
	collapsedSidebar: boolean,
	isMobile: boolean,
	showLogin: boolean,
	showMenu: boolean,
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
	forms: Record<string, any>,
	games: {
		currentList: ListTypes,
	},
	theme: string,
	responsive: Responsive,
	user: User,
}

export const { useGlobalState } = createGlobalState<State>({
	forms: {},
	games: {
		currentList: ListTypes.Popular,
	},
	responsive: {
		showLogin: false,
		showMenu: false,
		collapsedSidebar: false,
		isMobile: false,
	},
	theme: 'dark',
	user: {
		displayName: undefined,
		email: undefined,
		isStateKnown: false,
		accessToken: undefined,
		shouldRefresh: false,
	},

})
