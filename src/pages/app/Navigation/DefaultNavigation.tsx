import { UserRole } from 'types'

import { IconApps, IconHome, IconInfoCircle, IconListCheck, IconListNumbers, IconListSearch, IconSmartHome, IconTools, IconUser, IconUserOff } from '@tabler/icons'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'

import { useUser } from 'states/users'

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
				renderIcon={() => <IconHome size={22} css={{ flexShrink: 0 }} />}
			/>
			<Link
				url='/home'
				name='Smart home'
				isActive={pathname.includes('/home')}
				allowedRoles={[UserRole.Admin]}
				renderIcon={() => <IconSmartHome size={22} css={{ flexShrink: 0 }} />}
			/>
			<Link
				url='/users/profile'
				name={(accessToken && username) ? username : 'Not logged in'}
				isActive={pathname.includes('/users/profile')}
				renderIcon={() => accessToken ? <IconUser size={22} css={{ flexShrink: 0 }} /> : <IconUserOff size={22} css={{ flexShrink: 0 }} />}
			/>
			<ButtonAuthenticate />
			<Separator isCollapsed={isSidebarCollapsed}>
				Games
			</Separator>
			<Link
				url='/games/popular'
				name='Popular'
				isActive={pathname.includes('/games/popular')}
				renderIcon={() => <IconListNumbers size={22} css={{ flexShrink: 0 }} />}
			/>
			<Link
				url={userId ? `/games/following?user=${userId}` : '/games/following'}
				name='Following'
				isActive={pathname.includes('/games/following')}
				renderIcon={() => <IconListCheck size={22} css={{ flexShrink: 0 }} />}
			/>
			<Link
				url='/games/search'
				name='Search'
				isActive={pathname.includes('/games/search')}
				renderIcon={() => <IconListSearch size={22} css={{ flexShrink: 0 }} />}
			/>
			<Separator isCollapsed={isSidebarCollapsed}>
				Other
			</Separator>
			<Link
				url='/projects'
				name='Projects'
				isActive={pathname.includes('/projects')}
				renderIcon={() => <IconApps size={22} css={{ flexShrink: 0 }} />}
			/>
			<Link
				url='/components'
				name='Components'
				isActive={pathname.includes('/components')}
				renderIcon={() => <IconTools size={22} css={{ flexShrink: 0 }} />}
			/>
			<Link
				url='/about'
				name='About'
				isActive={pathname.includes('/about')}
				renderIcon={() => <IconInfoCircle size={22} css={{ flexShrink: 0 }} />}
			/>
		</Content>
	)
}
