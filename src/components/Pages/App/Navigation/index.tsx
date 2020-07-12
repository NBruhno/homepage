import Link from 'next/link'
import { useRouter } from 'next/router'

import { config } from 'config.client'

import { useRefresh } from 'reducers/refresh'
import { useAuth } from 'reducers/auth'

import { useStore } from 'lib/store'

import { ChevronFlip } from 'components/ChevronFlip'
import { ButtonText, ButtonIcon } from 'components/Buttons'
import { LoginIcon, PencilRulerIcon, LightDarkModeIcon, TestTubeIcon, GhostIcon, AccountIcon, LogoutIcon } from 'components/Icons'

import { Content } from './Content'
import { Header } from './Header'
import { NavLink } from '../NavLink'
import { Separator } from './Separator'
import { Sidebar } from './Sidebar'
import { Text } from './Text'

export const Navigation = () => {
	const { user } = useRefresh()
	const { state: { responsive }, dispatch } = useStore()
	const { logout } = useAuth()
	const { pathname } = useRouter()

	return (
		<Sidebar collapsed={responsive.collapsedSidebar} isMobile={responsive.isMobile}>
			<Content>
				{!responsive.isMobile && (
					<Link href='/' passHref>
						<Header onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: responsive.isMobile || false } })}>
							{!responsive.collapsedSidebar && <Text>Bruhno</Text>}
						</Header>
					</Link>
				)}
				<NavLink onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: responsive.isMobile || false } })}>
					<AccountIcon css={{ marginRight: '6px' }} size={22} />
					{user?.accessToken ? (
						<Text css={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
							{user.email}
						</Text>
					) : (
						<Text>Not logged in</Text>
					)}
				</NavLink>
				{!user?.accessToken && (
					<Link href='/login' passHref>
						<NavLink
							active={pathname === '/login'}
							onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: responsive.isMobile || false } })}
						>
							<LoginIcon css={{ marginRight: '6px' }} size={22} /><Text>Sign in</Text>
						</NavLink>
					</Link>
				)}
				{user?.accessToken && (
					<ButtonText
						css={{ margin: '4px 12px' }}
						slim
						label={(
							<div css={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
								<LogoutIcon css={{ marginRight: '6px' }} />Logout
							</div>
						)}
						onClick={() => {
							dispatch({ responsive: { ...responsive, collapsedSidebar: responsive.isMobile || false } })
							logout()
						}}
					/>
				)}
				<Separator>{!responsive.collapsedSidebar && <Text>Tools</Text>}</Separator>

				<Link href='/games' passHref>
					<NavLink
						active={pathname === '/games'}
						onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: responsive.isMobile || false } })}
					>
						<GhostIcon css={{ marginRight: '6px' }} size={22} /><Text>Games</Text>
					</NavLink>
				</Link>
				<Link href='/test' passHref>
					<NavLink
						active={pathname === '/test'}
						onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: responsive.isMobile || false } })}
					>
						<TestTubeIcon css={{ marginRight: '6px' }} size={22} /><Text>Test</Text>
					</NavLink>
				</Link>
				<NavLink
					href={config.environment === 'development' ? 'http://localhost:9000' : `/storybook/index.html`}
					onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: responsive.isMobile || false } })}
				>
					<PencilRulerIcon css={{ marginRight: '6px' }} size={22} /><Text>Storybook</Text>
				</NavLink>
			</Content>
			<Content>
				<Separator slim />
				<ButtonText
					css={{ margin: '4px 12px 6px' }}
					slim
					label={(
						<div css={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
							<LightDarkModeIcon css={{ marginRight: '6px' }} />
							<Text>{responsive.darkTheme ? 'Light theme' : 'Dark theme'}</Text>
						</div>
					)}
					onClick={() => dispatch({ responsive: { ...responsive, darkTheme: !responsive.darkTheme } })}
				/>
				<div css={(theme: Theme) => ({ borderTop: `1px solid ${theme.color.border}` })} />
				{!responsive.isMobile && (
					<ButtonIcon
						css={{ margin: '6px 12px' }}
						onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: !responsive.collapsedSidebar } })}
						label={(
							<div css={(theme: Theme) => ({ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: theme.color.text })}>
								<ChevronFlip horizontal isActive={responsive.collapsedSidebar} />
							</div>
						)}
					/>
				)}
			</Content>
		</Sidebar>
	)
}
