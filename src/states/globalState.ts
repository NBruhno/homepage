import { createGlobalState } from 'react-hooks-global-state'

import { ListTypes } from 'types/Games'

type Responsive = {
	collapsedSidebar: boolean,
	isMobile: boolean,
	isTablet: boolean,
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
	userId: string,
}

type Modal = {
	allowClosure?: boolean,
	modalContent: React.ReactNode,
	noWrapper?: boolean,
	showModal: boolean,
	onClose?: () => void,
}

export type State = {
	forms: Record<string, any>,
	games: {
		currentList: ListTypes,
	},
	modal: Modal,
	responsive: Responsive,
	theme: string,
	user: User,
}

export const { useGlobalState } = createGlobalState<State>({
	forms: {},
	games: {
		currentList: ListTypes.Popular,
	},
	responsive: {
		collapsedSidebar: false,
		isMobile: false,
		isTablet: false,
		showLogin: false,
		showMenu: false,
	},
	modal: {
		allowClosure: true,
		showModal: false,
		modalContent: null,
		noWrapper: false,
		onClose: null,
	},
	theme: 'dark',
	user: {
		displayName: undefined,
		email: undefined,
		isStateKnown: false,
		accessToken: undefined,
		shouldRefresh: false,
		userId: null,
	},
})
