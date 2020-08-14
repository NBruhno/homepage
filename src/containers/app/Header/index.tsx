import Link from 'next/link'

import { useStore } from 'lib/store'

import { ButtonIcon } from 'components/Buttons'
import { MenuIcon } from 'components/Icons'
import { Logo } from 'components/Logo'

import { NavLink } from '../NavLink'

import { Header as HeaderComponent } from './Header'

export const Header = (props: React.ComponentProps<'nav'>) => {
	const { state: { responsive }, dispatch } = useStore()

	return (
		<HeaderComponent {...props}>
			<ButtonIcon title='Menu' label={<MenuIcon />} onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: !responsive.collapsedSidebar } })} />
			<Link href='/' passHref>
				<NavLink currentColor css={{ alignItems: 'center' }} onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: true } })}>
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
