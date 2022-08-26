import create from 'zustand'
import { devtools } from 'zustand/middleware'

type Responsive = {
	isLoading: boolean,
	isSidebarCollapsed: boolean,
	isCookieBannerDismissed: boolean,
	isMobile: boolean,
	isTablet: boolean,
	isLaptop: boolean,
	isDesktop: boolean,
	isDesktopLarge: boolean,
	isDesktopMax: boolean,
	showLogin: boolean,
	showMenu: boolean,
}

export type PageState = Responsive & {
	title: string,
	theme: 'dark' | 'light',
	setIsCookieBannerDismissed: (isCookieBannerDismissed: boolean) => void,
	setIsLoading: (isLoading: boolean) => void,
	setResponsive: (responsiveParams: Partial<Responsive>) => void,
	setTheme: (theme: PageState['theme']) => void,
	setTitle: (title: string) => void,
}

export const usePage = create<PageState>()(devtools((set) => ({
	title: 'Bruhno',
	isLoading: true,
	isSidebarCollapsed: false,
	isCookieBannerDismissed: true,
	isMobile: false,
	isTablet: false,
	isLaptop: false,
	isDesktop: true,
	isDesktopLarge: false,
	isDesktopMax: false,
	showLogin: false,
	showMenu: false,
	theme: 'dark',
	setIsCookieBannerDismissed: (isCookieBannerDismissed) => set({ isCookieBannerDismissed }, false, 'setIsCookieBannerDismissed'),
	setIsLoading: (isLoading) => set({ isLoading }, false, 'setIsLoading'),
	setResponsive: (responsiveParams) => set(responsiveParams, false, 'setResponsive'),
	setTheme: (theme) => set({ theme }, false, 'setTheme'),
	setTitle: (title) => set({ title }, false, 'setTitle'),
}), { anonymousActionType: 'usePage' }))
