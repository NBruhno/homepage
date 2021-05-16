import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from 'states/auth'

import { HomeIcon, NotebookIcon, UserIcon, UserOffIcon, InfoIcon, AppsIcon, GamepadIcon } from 'components/Icons'
import { Placeholder } from 'components/Placeholder'

import { NavLink } from '../NavLink'

import { ButtonAuthenticate } from './Buttons/Authenticate'
import { Content } from './Content'
import { Separator } from './Separator'
import { Text } from './Text'

type Props = {
	collapsedSidebar: boolean,

	closeMenuOnInteraction: () => void,
}

export const DefaultNavigation = ({ closeMenuOnInteraction, collapsedSidebar }: Props) => {
	const { user } = useAuth()
	const { pathname } = useRouter()

	return (
		<Content css={{ paddingTop: '12px' }}>
			<Link href='/' passHref>
				<NavLink active={pathname.includes('/')} onClick={() => closeMenuOnInteraction()}>
					<HomeIcon title='Home' css={{ marginRight: '12px' }} size={22} /><Text>Home</Text>
				</NavLink>
			</Link>
			<Link href='/users/profile' passHref>
				<NavLink active={pathname.includes('/users/profile')} onClick={() => closeMenuOnInteraction()}>
					{user.accessToken
						? <UserIcon title='Profile' css={{ marginRight: '12px' }} size={22} />
						: <UserOffIcon title='Unauthorized' css={{ marginRight: '12px' }} size={22} />}
					<Placeholder isLoading={!user.isStateKnown}>
						<Text>{user.accessToken ? user.displayName : 'Not logged in'}</Text>
					</Placeholder>
				</NavLink>
			</Link>
			<ButtonAuthenticate />
			<Separator collapsed={collapsedSidebar} />
			<Link href='/games' passHref>
				<NavLink active={pathname.includes('/games')} onClick={() => closeMenuOnInteraction()}>
					<GamepadIcon title='Games' css={{ marginRight: '12px' }} size={22} /><Text>Games</Text>
				</NavLink>
			</Link>
			<Link href='/storybook' passHref>
				<NavLink active={pathname.includes('/storybook')} onClick={() => closeMenuOnInteraction()}>
					<NotebookIcon title='Storybook' css={{ marginRight: '12px' }} size={22} /><Text>Storybook</Text>
				</NavLink>
			</Link>
			{/* <Separator collapsed={collapsedSidebar}>Site</Separator> */}
			<Link href='/projects' passHref>
				<NavLink active={pathname.includes('/projects')} onClick={() => closeMenuOnInteraction()}>
					<AppsIcon title='Projects' css={{ marginRight: '12px' }} size={22} /><Text>Projects</Text>
				</NavLink>
			</Link>
			<Link href='/about' passHref>
				<NavLink active={pathname.includes('/about')} onClick={() => closeMenuOnInteraction()}>
					<InfoIcon title='About' css={{ marginRight: '12px' }} size={22} /><Text>About</Text>
				</NavLink>
			</Link>
		</Content>
	)
}
