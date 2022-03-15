import { useGlobalState } from 'states/global'

export type Responsive = {
	isLoading: boolean,
	isSidebarCollapsed: boolean,
	isMobile: boolean,
	isTablet: boolean,
	isLaptop: boolean,
	isDesktop: boolean,
	isDesktopLarge: boolean,
	isDesktopMax: boolean,
	showLogin: boolean,
	showMenu: boolean,
}

export const useResponsive = () => {
	const [responsive, setResponsive] = useGlobalState('responsive')
	const updateResponsive = (payload: Partial<typeof responsive>) => {
		setResponsive({ ...responsive, ...payload })
	}

	return {
		...responsive,
		updateResponsive,
	}
}
