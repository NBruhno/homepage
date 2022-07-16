import { usePage } from './usePage'

export const useResponsive = () => {
	const responsiveState = usePage((state) => ({
		isDesktop: state.isDesktop,
		isDesktopLarge: state.isDesktopLarge,
		isDesktopMax: state.isDesktopMax,
		isLaptop: state.isLaptop,
		isMobile: state.isMobile,
		isTablet: state.isTablet,
		isSidebarCollapsed: state.isSidebarCollapsed,
		isLoading: state.isLoading,
		showLogin: state.showLogin,
		showMenu: state.showMenu,
	}))
	const setResponsiveState = usePage((state) => state.setResponsive)

	return { ...responsiveState, setResponsiveState }
}
