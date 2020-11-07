import { ButtonIcon } from 'components/Buttons'
import { MenuIcon } from 'components/Icons'
import { Logo } from 'components/Logo'
import Link from 'next/link'
import { useResponsive } from 'states/responsive'

import { NavLink } from '../NavLink'

import { Header as HeaderComponent } from './Header'

export const Header = (props: React.ComponentProps<'nav'>) => {
	const { showMenu, updateResponsive } = useResponsive()

	return (
		<HeaderComponent {...props}>
			<ButtonIcon
				title='Menu'
				label={<MenuIcon css={(theme: Theme) => ({ color: theme.color.text })} />}
				onClick={() => updateResponsive({ showMenu: !showMenu })}
			/>
			<Link href='/' passHref>
				<NavLink currentColor css={{ alignItems: 'center' }} onClick={() => updateResponsive({ showMenu: false })}>
					<Logo
						css={(theme: Theme) => ({
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
