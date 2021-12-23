import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from 'states/users'

import { HomeIcon, UserIcon, UserOffIcon, InfoIcon, AppsIcon, ListNumberIcon, ListCheckIcon, ListSearchIcon } from 'components/Icons'
import { Placeholder } from 'components/Placeholder'

import { NavLink } from '../NavLink'

import { ButtonAuthenticate } from './Buttons/Authenticate'
import { Content } from './Content'
import { Separator } from './Separator'
import { Text } from './Text'

type Props = {
	isSidebarCollapsed: boolean,

	closeMenuOnInteraction: () => void,
}

export const DefaultNavigation = ({ closeMenuOnInteraction, isSidebarCollapsed }: Props) => {
	const { user } = useAuth()
	const { pathname } = useRouter()

	return (
		<Content css={{ paddingTop: '12px' }}>
			<Link href='/' passHref>
				<NavLink isActive={pathname === '/'} onClick={() => closeMenuOnInteraction()}>
					<HomeIcon title='Home' css={{ marginRight: '12px' }} size={22} /><Text>Home</Text>
				</NavLink>
			</Link>
			<Link href='/users/profile' passHref>
				<NavLink isActive={pathname.includes('/users/profile')} onClick={() => closeMenuOnInteraction()}>
					{user.accessToken
						? <UserIcon title='Profile' css={{ marginRight: '12px' }} size={22} />
						: <UserOffIcon title='Unauthorized' css={{ marginRight: '12px' }} size={22} />}
					<Placeholder isLoading={!user.isStateKnown}>
						<Text>{user.accessToken ? user.username : 'Not logged in'}</Text>
					</Placeholder>
				</NavLink>
			</Link>
			<ButtonAuthenticate />
			<Separator isCollapsed={isSidebarCollapsed}>
				Games
			</Separator>
			<Link href='/games/popular' passHref>
				<NavLink isActive={pathname.includes('/games/popular')} onClick={() => closeMenuOnInteraction()}>
					<ListNumberIcon title='Popular games' css={{ marginRight: '12px' }} size={22} /><Text>Popular</Text>
				</NavLink>
			</Link>
			<Link href={user.userId ? `/games/following?user=${user.userId}` : '/games/following'} passHref>
				<NavLink isActive={pathname.includes('/games/following')} onClick={() => closeMenuOnInteraction()}>
					<ListCheckIcon title='Followed games' css={{ marginRight: '12px' }} size={22} /><Text>Following</Text>
				</NavLink>
			</Link>
			<Link href='/games/search' passHref>
				<NavLink isActive={pathname.includes('/games/search')} onClick={() => closeMenuOnInteraction()}>
					<ListSearchIcon title='Search for games' css={{ marginRight: '12px' }} size={22} /><Text>Search</Text>
				</NavLink>
			</Link>
			<Separator isCollapsed={isSidebarCollapsed}>
				Other
			</Separator>
			<Link href='/projects' passHref>
				<NavLink isActive={pathname.includes('/projects')} onClick={() => closeMenuOnInteraction()}>
					<AppsIcon title='Projects' css={{ marginRight: '12px' }} size={22} /><Text>Projects</Text>
				</NavLink>
			</Link>
			<Link href='/about' passHref>
				<NavLink isActive={pathname.includes('/about')} onClick={() => closeMenuOnInteraction()}>
					<InfoIcon title='About' css={{ marginRight: '12px' }} size={22} /><Text>About</Text>
				</NavLink>
			</Link>
		</Content>
	)
}
