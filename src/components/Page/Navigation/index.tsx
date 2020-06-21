import Link from 'next/link'

import { config } from 'config'

import { useAuth } from 'reducers/auth'

import { Header } from './Header'
import { Placeholder } from './Placeholder'
import { NavLink } from './NavLink'

export const Navigation = (props: React.ComponentProps<'nav'>) => {
	const { user, userLoading, userError } = useAuth()

	return (
		<>
			<Header {...props}>
				<Link href='/' passHref>
					<NavLink>Home</NavLink>
				</Link>
				<Link href='/test' passHref>
					<NavLink>Test</NavLink>
				</Link>
				<Link href='/tests' passHref>
					<NavLink>Projects</NavLink>
				</Link>
				<Link href='/login' passHref>
					<NavLink>Login</NavLink>
				</Link>
				<Link href='/games' passHref>
					<NavLink>Games</NavLink>
				</Link>
				<NavLink href={config.environment === 'development' ? 'http://localhost:9000' : `/storybook/index.html`}>
					Storybook
				</NavLink>
				<NavLink>
					{userLoading && <div>Loading user...</div>}
					{userError && <div>Error loading user</div>}
					{user && <div>{user.displayName}</div>}
				</NavLink>
			</Header>
			<Placeholder />
		</>
	)
}
