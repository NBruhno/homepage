import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from 'states/auth'

import { ButtonText } from 'components/Buttons'
import { HomeIcon, NotebookIcon, UserIcon, UserOffIcon, LoginIcon, LogoutIcon, InfoIcon, AppsIcon, GamepadIcon } from 'components/Icons'
import { Placeholder } from 'components/Placeholder'

import { NavLink } from '../NavLink'

import { Content } from './Content'
import { Separator } from './Separator'
import { Text } from './Text'

const ButtonTextStyled = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
	<ButtonText
		css={{ margin: '4px 12px', height: '35px' }}
		slim
		label={(
			<div css={{ display: 'flex', alignItems: 'center', height: '20px' }}>
				{children}
			</div>
		)}
		onClick={onClick}
	/>
)

type Props = {
	collapsedSidebar: boolean,
	showLogin: boolean,

	closeMenuOnInteraction: () => void,
	updateResponsive: (payload: any) => void,
}

export const DefaultNavigation = ({ closeMenuOnInteraction, collapsedSidebar, updateResponsive, showLogin }: Props) => {
	const { user, logout } = useAuth()
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
			{user.accessToken ? (
				<ButtonTextStyled onClick={async () => { await logout() }}>
					<LogoutIcon css={{ marginRight: '12px' }} />Logout
				</ButtonTextStyled>
			) : (
				<ButtonTextStyled onClick={() => updateResponsive({ showLogin: !showLogin, showMenu: false })}>
					<LoginIcon css={{ marginRight: '12px' }} />Login
				</ButtonTextStyled>
			)}
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
