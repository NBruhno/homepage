import Link from 'next/link'
import { useState } from 'react'

import { config } from 'config'

import { useAuth } from 'reducers/auth'

import { useStore } from 'lib/store'

import { ButtonSolid } from 'components/Buttons'

import { Header } from './Header'
import { Placeholder } from './Placeholder'
import { NavLink } from './NavLink'
import { MenuAnchor } from './MenuAnchor'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'

export const Navigation = (props: React.ComponentProps<'nav'>) => {
	const { user, userLoading, userError } = useAuth()
	const [showMenu, setShowMenu] = useState(false)
	const { state, dispatch } = useStore()

	return (
		<>
			<Header {...props}>
				<Link href='/' passHref>
					<NavLink>Home</NavLink>
				</Link>
				<Link href='/login' passHref>
					<NavLink>Login</NavLink>
				</Link>

				<MenuAnchor
					onClick={() => setShowMenu(!showMenu)}
					onMouseEnter={() => setShowMenu(true)}
					onMouseLeave={() => setShowMenu(false)}
				>
					<NavLink>Projects</NavLink>
					<Menu isOpen={showMenu}>
						<MenuItem>
							<Link href='/games' passHref>
								<NavLink>Games</NavLink>
							</Link>
						</MenuItem>
						<MenuItem>
							<Link href='/test' passHref>
								<NavLink>Test</NavLink>
							</Link>
						</MenuItem>
						<MenuItem>
							<Link href='/tests' passHref>
								<NavLink>Projects</NavLink>
							</Link>
						</MenuItem>
						<MenuItem>
							<NavLink href={config.environment === 'development' ? 'http://localhost:9000' : `/storybook/index.html`}>
								Storybook
							</NavLink>
						</MenuItem>
					</Menu>
				</MenuAnchor>
				<NavLink>
					{userLoading && <div>Loading user...</div>}
					{userError && <div>Error loading user</div>}
					{user && <div>{user.displayName}</div>}
				</NavLink>
				<ButtonSolid
					label={state.darkTheme ? 'Light theme' : 'Dark theme'}
					onClick={() => dispatch({ darkTheme: !state.darkTheme })}
				/>
			</Header>
			<Placeholder />
		</>
	)
}
