import { createGlobalState } from 'react-hooks-global-state'

type Responsive = {
	collapsedSidebar: boolean,
	isMobile: boolean,
	isTablet: boolean,
	isLaptop: boolean,
	showLogin: boolean,
	showMenu: boolean,
}

type User = {
	accessToken?: string,
	displayName: string | null,
	email: string | null,
	intermediateToken?: string,
	isStateKnown: boolean,
	role?: string,
	secret?: string,
	shouldRefresh: boolean,
	twoFactorSecret?: string,
	userId: string | null,
}

type Modal = {
	allowClosure?: boolean,
	modalContent: React.ReactNode,
	noWrapper?: boolean,
	showModal: boolean,
	onClose?: (() => void) | null,
}

export type State = {
	forms: Record<string, any>,
	popularGames: {
		afters: Array<string>,
		numberOfPages: number,
	},
	followingGames: {
		afters: Array<string>,
		numberOfPages: number,
	},
	games: {
		hasSearch: boolean,
	},
	modal: Modal,
	responsive: Responsive,
	theme: string,
	user: User,
}

export const { useGlobalState } = createGlobalState<State>({
	forms: {},
	popularGames: {
		afters: [''],
		numberOfPages: 1,
	},
	followingGames: {
		afters: [''],
		numberOfPages: 1,
	},
	games: {
		hasSearch: false,
	},
	responsive: {
		collapsedSidebar: false,
		isMobile: false,
		isTablet: false,
		isLaptop: false,
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
		displayName: null,
		email: null,
		isStateKnown: false,
		accessToken: undefined,
		shouldRefresh: false,
		userId: null,
	},
})
