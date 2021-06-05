import type { FollowingGames, PopularGames, SearchGames } from './games'
import type { Modal } from './modal'
import type { Responsive } from './responsive'
import type { Theme } from './theme'
import type { User } from './users'

import { createGlobalState } from 'react-hooks-global-state'

export type State = {
	forms: Record<string, Record<string, any>>,
	popularGames: PopularGames,
	followingGames: FollowingGames,
	searchGames: SearchGames,
	modal: Modal,
	responsive: Responsive,
	theme: Theme,
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
	searchGames: {
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
