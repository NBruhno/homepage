import type { ComponentPropsWithoutRef } from 'react'

import Link from 'next/link'

import { useResponsive } from 'states/page'

import { ButtonIcon } from 'components/Buttons'
import { MenuIcon } from 'components/Icons'
import { Logo } from 'components/Logo'

import { NavLink } from '../NavLink'

import { Header as HeaderComponent } from './Header'
import { LoadingBar } from './LoadingBar'

export const Header = (props: ComponentPropsWithoutRef<'nav'>) => {
	const { showMenu, setResponsiveState } = useResponsive()

	return (
		<>
			<LoadingBar />
			<HeaderComponent {...props}>
				<ButtonIcon
					label={<MenuIcon css={(theme) => ({ color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted })} />}
					onClick={() => setResponsiveState({ showMenu: !showMenu })}
				/>
				<Link href='/' passHref>
					<NavLink css={{ alignItems: 'center' }} onClick={() => setResponsiveState({ showMenu: false })}>
						<Logo
							css={(theme) => ({
								width: '32px',
								height: '32px',
								margin: '0 8px 0 -6px',
								transition: `margin 300ms ${theme.animation.default}`,
							})}
						/>
						Bruhno
					</NavLink>
				</Link>
			</HeaderComponent>
		</>
	)
}
