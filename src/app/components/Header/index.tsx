import type { ComponentPropsWithoutRef } from 'react'

import { useResponsive } from 'states/page'

import { ButtonIcon } from 'components/Buttons'

import { NavLink } from '../NavLink'

import { Header as HeaderComponent } from './Header'
import { LoadingBar } from './LoadingBar'
import { Logo } from './Logo'
import { MenuIcon } from './MenuIcon'

export const Header = (props: ComponentPropsWithoutRef<'nav'>) => {
	const { showMenu, setResponsiveState } = useResponsive()

	return (
		<>
			<LoadingBar />
			<HeaderComponent {...props}>
				<ButtonIcon
					label={<MenuIcon />}
					onClick={() => setResponsiveState({ showMenu: !showMenu })}
				/>
				<NavLink style={{ alignItems: 'center' }} href='/' onClick={() => setResponsiveState({ showMenu: false })}>
					<Logo />
					Bruhno
				</NavLink>
			</HeaderComponent>
		</>
	)
}
