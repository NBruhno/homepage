import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { useResponsive } from 'reducers/responsive'
import { useAuth } from 'reducers/auth'

import { Shade } from '../Shade'
import { Footer } from '../Footer'

import { MainContent } from './MainContent'

const AuthGuard = dynamic(async () => {
	const module = await import('../AuthGuard')
	return module.AuthGuard
})
const FormLogin = dynamic(async () => {
	const module = await import('components/Forms/Login')
	return module.FormLogin
})

const protectedRoutes = [
	'/users/profile',
]

const roleProtectedRoutes = [
	'/users',
]

export const Main = ({ children }: React.ComponentProps<'main'>) => {
	const { showLogin, updateResponsive } = useResponsive()
	const { user } = useAuth()
	const [protectRoute, setProtectRoute] = useState(false)
	const [roleProtectRoute, setRoleProtectRoute] = useState(false)
	const { pathname } = useRouter()

	useEffect(() => {
		updateResponsive({ showLogin: false })
		if (user.isStateKnown) {
			if (!user.accessToken && (protectedRoutes.includes(pathname) || roleProtectedRoutes.includes(pathname))) {
				setProtectRoute(true)
			} else if (user.accessToken && roleProtectedRoutes.includes(pathname) && user.role !== 'owner') {
				setRoleProtectRoute(true)
			} else if (protectRoute) {
				setProtectRoute(false)
			} else if (roleProtectRoute) {
				setRoleProtectRoute(false)
			}
		}
	}, [pathname, user.isStateKnown, user.role])

	return (
		<MainContent>
			{children}
			<AuthGuard
				allowClosure={(!protectRoute || !roleProtectRoute)}
				show={(protectRoute || roleProtectRoute || showLogin) ?? false}
			>
				{!user.accessToken ? (
					<FormLogin />
				) : (
					<>
						<h1 css={{ margin: '0 0 24px', fontSize: '1.5em' }}>You are not authorized to access this resource</h1>
						<Link href='/' passHref><a css={(theme: Theme) => ({ color: theme.color.text })}>Home</a></Link>
					</>
				)}
			</AuthGuard>
			<Shade />
			<Footer />
		</MainContent>
	)
}
