import Link from 'next/link'
import { useRouter } from 'next/router'

import { config } from 'config.client'

import { useRefresh } from 'reducers/refresh'

import { useStore } from 'lib/store'

import { ButtonText } from 'components/Buttons'
import { LightDarkModeIcon } from 'components/Icons'

import { Sidebar } from './Sidebar'
import { NavLink } from './NavLink'

export const Navigation = (props: React.ComponentProps<'nav'>) => {
	const { user } = useRefresh()
	const { state, dispatch } = useStore()
	const { pathname } = useRouter()

	return (
		<Sidebar {...props}>
			<NavLink>
				{user ? <div>{user.email}</div> : <div>Loading user...</div>}
			</NavLink>
			<Link href='/' passHref>
				<NavLink active={pathname === '/'}>Home</NavLink>
			</Link>
			<Link href='/login' passHref>
				<NavLink active={pathname === '/login'}>Login</NavLink>
			</Link>
			<Link href='/games' passHref>
				<NavLink active={pathname === '/games'}>Games</NavLink>
			</Link>
			<Link href='/test' passHref>
				<NavLink active={pathname === '/test'}>Test</NavLink>
			</Link>
			<NavLink href={config.environment === 'development' ? 'http://localhost:9000' : `/storybook/index.html`}>
				Storybook
			</NavLink>
			<ButtonText
				fullWidth
				css={{ width: 'calc(100% + 24px)', maxWidth: 'none' }}
				label={(
					<div css={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
						<LightDarkModeIcon css={{ marginRight: '6px' }} />
						{state.darkTheme ? 'Light theme' : 'Dark theme'}
					</div>
				)}
				onClick={() => dispatch({ darkTheme: !state.darkTheme })}
			/>
		</Sidebar>
	)
}
