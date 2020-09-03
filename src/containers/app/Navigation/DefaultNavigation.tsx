import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from 'states/auth'

import { LoginIcon, PencilRulerIcon, TestTubeIcon, ControllerIcon, AccountIcon, LogoutIcon, InfoIcon, ToolsIcon } from 'components/Icons'
import { Placeholder } from 'components/Placeholder'
import { ButtonText } from 'components/Buttons'

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
	closeMenuOnInteraction: () => void,
	collapsedSidebar: boolean,
	showLogin: boolean,
	updateResponsive: (payload: any) => void,
}

export const DefaultNavigation = ({ closeMenuOnInteraction, collapsedSidebar, updateResponsive, showLogin }: Props) => {
	const { user, logout } = useAuth()
	const { pathname } = useRouter()

	return (
		<Content css={{ paddingTop: '12px' }}>
			<Link href='/users/profile' passHref>
				<NavLink active={pathname.includes('/users/profile')} onClick={() => closeMenuOnInteraction()}>
					<AccountIcon css={{ marginRight: '6px' }} size={22} />
					<Placeholder isLoading={!user.isStateKnown}>
						{user.accessToken ? <Text>{user.displayName}</Text> : <Text>Not logged in</Text>}
					</Placeholder>
				</NavLink>
			</Link>
			{user.accessToken ? (
				<ButtonTextStyled onClick={async () => { await logout() }}>
					<LogoutIcon css={{ marginRight: '6px' }} />Logout
				</ButtonTextStyled>
			) : (
				<ButtonTextStyled onClick={() => {
					window.scrollTo(0, 0)
					updateResponsive({ showLogin: !showLogin })
					closeMenuOnInteraction()
				}}
				>
					<LoginIcon css={{ marginRight: '6px' }} />Login
				</ButtonTextStyled>
			)}
			<Separator collapsed={collapsedSidebar}>Tools</Separator>
			<Link href='/games' passHref>
				<NavLink active={pathname.includes('/games')} onClick={() => closeMenuOnInteraction()}>
					<ControllerIcon css={{ marginRight: '6px' }} size={22} /><Text>Games</Text>
				</NavLink>
			</Link>
			<Link href='/404' passHref>
				<NavLink active={pathname.includes('/test')} onClick={() => closeMenuOnInteraction()}>
					<TestTubeIcon css={{ marginRight: '6px' }} size={22} /><Text>Test</Text>
				</NavLink>
			</Link>
			<Link href='/storybook' passHref>
				<NavLink active={pathname.includes('/storybook')} onClick={() => closeMenuOnInteraction()}>
					<PencilRulerIcon css={{ marginRight: '6px' }} size={22} /><Text>Storybook</Text>
				</NavLink>
			</Link>
			<Separator collapsed={collapsedSidebar}>Site</Separator>
			<Link href='/404' passHref>
				<NavLink active={pathname.includes('/projects')} onClick={() => closeMenuOnInteraction()}>
					<ToolsIcon css={{ marginRight: '6px' }} size={22} /><Text>Projects</Text>
				</NavLink>
			</Link>
			<Link href='/about' passHref>
				<NavLink active={pathname.includes('/about')} onClick={() => closeMenuOnInteraction()}>
					<InfoIcon css={{ marginRight: '6px' }} size={22} /><Text>About</Text>
				</NavLink>
			</Link>
		</Content>
	)
}
