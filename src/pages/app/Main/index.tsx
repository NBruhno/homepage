import type { ComponentPropsWithoutRef } from 'react'

import { useMediaQuery } from '@react-hook/media-query'
import { setUser } from '@sentry/nextjs'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'

import { useModal } from 'states/page'
import { useResponsive } from 'states/page'
import { useUser } from 'states/users'

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

type Props = ComponentPropsWithoutRef<'main'> & {
	isNebulaVisible: boolean,
}

export const Main = ({ children, isNebulaVisible }: Props) => {
	const { pathname } = useRouter()
	const { showLogin, setResponsiveState } = useResponsive()
	const { onOpenModal, onCloseModal } = useModal()
	const { isStateKnown, accessToken, role, userId, username, email } = useUser((state) => state, shallow)

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
		onCloseModal()
		if (isStateKnown) {
			if (!accessToken && (protectedRoutes.includes(pathname) || roleProtectedRoutes.includes(pathname))) {
				setIsRouteProtected(true)
			} else if (accessToken && roleProtectedRoutes.includes(pathname) && role !== 'Admin') {
				setIsRouteRoleProtected(true)
			} else if (isRouteProtected) {
				setIsRouteProtected(false)
			} else if (isRouteRoleProtected) {
				setIsRouteRoleProtected(false)
			}

			if (userId && username && email) { // We want to add an user to our transactions if available
				setUser({ id: userId, username, email })
			}
		}
	}, [pathname, isStateKnown, role])

	useEffect(() => {
		setResponsiveState({ isMobile, isTablet, isLaptop, isDesktop, isDesktopLarge, isDesktopMax, isSidebarCollapsed })
	// DO NOT set updateResponsive as part of the dependency, since that function updates every time the state is updated
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobile, isTablet, isLaptop, isDesktop, isDesktopLarge, isDesktopMax, isSidebarCollapsed])

	useEffect(() => {
		if (isRouteProtected || isRouteRoleProtected || showLogin) {
			onOpenModal((
				<>
					{!accessToken ? (
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
			), { allowClosure: !isRouteProtected || !isRouteRoleProtected, onClose: () => setResponsiveState({ showLogin: !showLogin }) })
		}
	}, [isRouteProtected, isRouteRoleProtected, showLogin])

	return (
		<MainContent>
			{children}
			<Modal />
			<Shade />
			<Footer isTransparent={isNebulaVisible} />
		</MainContent>
	)
}
