import type { ComponentPropsWithoutRef } from 'react'

import { IconMenu2 } from '@tabler/icons'

import { useResponsive } from 'states/page'

import { ButtonIcon } from 'components/Buttons'
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
					label={<IconMenu2 css={(theme) => ({ color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted })} />}
					onClick={() => setResponsiveState({ showMenu: !showMenu })}
				/>
				<NavLink css={{ alignItems: 'center' }} href='/' onClick={() => setResponsiveState({ showMenu: false })}>
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
			</HeaderComponent>
		</>
	)
}
