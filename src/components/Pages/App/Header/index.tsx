import Link from 'next/link'

import { useStore } from 'lib/store'

import { ButtonIcon } from 'components/Buttons'
import { MenuIcon } from 'components/Icons'

import { NavLink } from '../NavLink'

import { Header as HeaderComponent } from './Header'

export const Header = (props: React.ComponentProps<'nav'>) => {
	const { state: { responsive }, dispatch } = useStore()

	return (
		<HeaderComponent {...props}>
			<ButtonIcon title='Menu' label={<MenuIcon />} onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: !responsive.collapsedSidebar } })} />
			<Link href='/' passHref>
				<NavLink>Bruhno</NavLink>
			</Link>
		</HeaderComponent>
	)
}
