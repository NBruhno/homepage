import { UserRole } from 'types'

import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'

import { useUser } from 'states/users'

import { HomeIcon, UserIcon, UserOffIcon, InfoIcon, AppsIcon, ListNumberIcon, ListCheckIcon, ListSearchIcon, SmartHomeIcon, ToolsIcon } from 'components/Icons'

import { ButtonAuthenticate } from './Buttons/Authenticate'
import { Content } from './Content'
import { Link } from './Link'
import { Separator } from './Separator'

type Props = {
	isSidebarCollapsed: boolean,
}

export const DefaultNavigation = ({ isSidebarCollapsed }: Props) => {
	const { username, accessToken, userId } = useUser((state) => state, shallow)
	const { pathname } = useRouter()

	return (
		<Content css={{ paddingTop: '12px' }}>
			<Link
				url='/'
				name='Home'
				Icon={HomeIcon}
			/>
			<Link
				url='/home'
				name='Smart home'
				isActive={pathname.includes('/home')}
				allowedRoles={[UserRole.Admin]}
				Icon={SmartHomeIcon}
			/>
			<Link
				url='/users/profile'
				name={(accessToken && username) ? username : 'Not logged in'}
				isActive={pathname.includes('/users/profile')}
				Icon={accessToken ? UserIcon : UserOffIcon}
			/>
			<ButtonAuthenticate />
			<Separator isCollapsed={isSidebarCollapsed}>
				Games
			</Separator>
			<Link
				url='/games/popular'
				name='Popular'
				isActive={pathname.includes('/games/popular')}
				Icon={ListNumberIcon}
			/>
			<Link
				url={userId ? `/games/following?user=${userId}` : '/games/following'}
				name='Following'
				isActive={pathname.includes('/games/following')}
				Icon={ListCheckIcon}
			/>
			<Link
				url='/games/search'
				name='Search'
				isActive={pathname.includes('/games/search')}
				Icon={ListSearchIcon}
			/>
			<Separator isCollapsed={isSidebarCollapsed}>
				Other
			</Separator>
			<Link
				url='/projects'
				name='Projects'
				isActive={pathname.includes('/projects')}
				Icon={AppsIcon}
			/>
			<Link
				url='/components'
				name='Components'
				isActive={pathname.includes('/components')}
				Icon={ToolsIcon}
			/>
			<Link
				url='/about'
				name='About'
				isActive={pathname.includes('/about')}
				Icon={InfoIcon}
			/>
		</Content>
	)
}
