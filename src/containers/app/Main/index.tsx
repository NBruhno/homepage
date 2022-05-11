import type { ComponentPropsWithoutRef } from 'react'

import { useMediaQuery } from '@react-hook/media-query'
import { setUser } from '@sentry/nextjs'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useModal } from 'states/modal'
import { useResponsive } from 'states/responsive'
import { useAuth } from 'states/users'

import { mediaQueries } from 'styles/theme'

import { Footer } from '../Footer'

import { MainContent } from './MainContent'
import { Modal } from './Modal'
import { Shade } from './Shade'

const FormLogin = dynamic(async () => {
	const component = await import('components/Forms/Login')
	return component.FormLogin
}, { ssr: false })

const protectedRoutes = [
	'/users/profile',
]

const roleProtectedRoutes = [
	'/users',
	'/home',
]

export const Main = ({ children }: ComponentPropsWithoutRef<'main'>) => {
	const { pathname } = useRouter()
	const { showLogin, updateResponsive } = useResponsive()
	const { openModal, closeModal } = useModal()
	const { user } = useAuth()

	// Internal state for handling the auth guard on routes
	const [isRouteProtected, setIsRouteProtected] = useState(false)
	const [isRouteRoleProtected, setIsRouteRoleProtected] = useState(false)
	const show = (isRouteProtected || isRouteRoleProtected || showLogin) || false

	// Store media queries for use in our theme (useResponsive())
	const isMobile = useMediaQuery(mediaQueries.maxMobile.replace('@media ', ''))
	const isTablet = useMediaQuery(mediaQueries.mobileToTablet.replace('@media ', ''))
	const isLaptop = useMediaQuery(mediaQueries.tabletToLaptop.replace('@media ', ''))
	const isDesktop = useMediaQuery(mediaQueries.laptopToDesktop.replace('@media ', ''))
	const isDesktopLarge = useMediaQuery(mediaQueries.desktopToDesktopLarge.replace('@media ', ''))
	const isDesktopMax = useMediaQuery(mediaQueries.minDesktopLarge.replace('@media ', ''))
	const isSidebarCollapsed = useMediaQuery(mediaQueries.maxLaptop.replace('@media ', ''))

	useEffect(() => {
		closeModal()
		if (user.isStateKnown) {
			if (!user.accessToken && (protectedRoutes.includes(pathname) || roleProtectedRoutes.includes(pathname))) {
				setIsRouteProtected(true)
			} else if (user.accessToken && roleProtectedRoutes.includes(pathname) && user.role !== 'Admin') {
				setIsRouteRoleProtected(true)
			} else if (isRouteProtected) {
				setIsRouteProtected(false)
			} else if (isRouteRoleProtected) {
				setIsRouteRoleProtected(false)
			}

			if (user.userId && user.username && user.email) { // We want to add an user to our transactions if available
				setUser({ id: user.userId, username: user.username, email: user.email })
			}
		}
	}, [pathname, user.isStateKnown, user.role])

	useEffect(() => {
		updateResponsive({ isMobile, isTablet, isLaptop, isDesktop, isDesktopLarge, isDesktopMax, isSidebarCollapsed })
	// DO NOT set updateResponsive as part of the dependency, since that function updates every time the state is updated
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobile, isTablet, isLaptop, isDesktop, isDesktopLarge, isDesktopMax, isSidebarCollapsed])

	useEffect(() => {
		if (isRouteProtected || isRouteRoleProtected || showLogin) {
			openModal((
				<>
					{!user.accessToken ? (
						<>
							{show && <FormLogin />}
						</>
					) : (
						<>
							<h1 css={{ margin: '0 0 24px', fontSize: '1.5em' }}>You are not authorized to access this resource</h1>
							<Link href='/' passHref><a css={(theme) => ({ color: theme.color.text })}>Home</a></Link>
						</>
					)}
				</>
			), { allowClosure: !isRouteProtected || !isRouteRoleProtected, onClose: () => updateResponsive({ showLogin: !showLogin }) })
		}
	}, [isRouteProtected, isRouteRoleProtected, showLogin])

	return (
		<MainContent>
			{children}
			<Modal />
			<Shade />
			<Footer />
		</MainContent>
	)
}
