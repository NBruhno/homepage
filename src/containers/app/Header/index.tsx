import type { ComponentProps } from 'react'

import Link from 'next/link'

import { useResponsive } from 'states/responsive'

import { ButtonIcon } from 'components/Buttons'
import { MenuIcon } from 'components/Icons'
import { Logo } from 'components/Logo'

import { NavLink } from '../NavLink'

import { Header as HeaderComponent } from './Header'

export const Header = (props: ComponentProps<'nav'>) => {
	const { showMenu, updateResponsive } = useResponsive()

	return (
		<HeaderComponent {...props}>
			<ButtonIcon
				label={<MenuIcon css={(theme) => ({ color: theme.darkTheme ? theme.color.text : theme.color.textInverted })} />}
				onClick={() => updateResponsive({ showMenu: !showMenu })}
			/>
			<Link href='/' passHref>
				<NavLink css={{ alignItems: 'center' }} onClick={() => updateResponsive({ showMenu: false })}>
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
	)
}
