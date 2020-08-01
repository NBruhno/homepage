import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from 'reducers/auth'
import { useRefresh } from 'reducers/refresh'
import { useResponsive } from 'reducers/responsive'

import { ChevronFlip } from 'components/ChevronFlip'
import { ButtonText, ButtonIcon } from 'components/Buttons'
import { LoginIcon, PencilRulerIcon, LightDarkModeIcon, TestTubeIcon, ControllerIcon, AccountIcon, LogoutIcon, InfoIcon, ToolsIcon } from 'components/Icons'
import { Placeholder } from 'components/Placeholder'
import { Logo } from 'components/Logo'

import { Content } from './Content'
import { Header } from './Header'
import { NavLink } from '../NavLink'
import { Separator } from './Separator'
import { Sidebar } from './Sidebar'
import { Text } from './Text'

export const Navigation = () => {
	const { user } = useRefresh()
	const { isMobile, collapsedSidebar, darkTheme, updateResponsive, showLogin } = useResponsive()
	const { logout } = useAuth()
	const { pathname } = useRouter()
	const closeMenuOnInteraction = () => {
		if (isMobile) updateResponsive({ collapsedSidebar: true })
	}

	return (
		<Sidebar collapsed={collapsedSidebar}>
			{!isMobile && (
				<Link href='/' passHref>
					<Header onClick={() => closeMenuOnInteraction()}>
						<Logo
							css={{
								width: '32px',
								height: '32px',
								margin: collapsedSidebar ? '0 8px 0 -6px' : '0 6px 0 42px',
								transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1)',
							}}
						/>
						<Text>Bruhno</Text>
					</Header>
				</Link>
			)}
			<Content css={{ paddingTop: '12px' }}>
				<Link href='/user/profile' passHref>
					<NavLink
						active={pathname.includes('/user/profile')}
						onClick={() => closeMenuOnInteraction()}
					>
						<AccountIcon css={{ marginRight: '6px' }} size={22} />
						<Placeholder isLoading={!user.isStateKnown}>
							{user.accessToken ? (
								<Text>
									{user.displayName}
								</Text>
							) : (
								<Text>Not logged in</Text>
							)}
						</Placeholder>
					</NavLink>
				</Link>
				{user.accessToken ? (
					<ButtonText
						css={{ margin: '4px 12px', height: '35px' }}
						slim
						label={(
							<div css={{ display: 'flex', alignItems: 'center', height: '20px' }}>
								<LogoutIcon css={{ marginRight: '6px' }} />Logout
							</div>
						)}
						onClick={async () => { await logout() }}
					/>
				) : (
					<ButtonText
						css={{ margin: '4px 12px', height: '35px' }}
						slim
						label={(
							<div css={{ display: 'flex', alignItems: 'center', height: '20px' }}>
								<LoginIcon css={{ marginRight: '6px' }} />Login
							</div>
						)}
						onClick={() => {
							window.scrollTo(0, 0)
							updateResponsive({ showLogin: !showLogin, collapsedSidebar: true })
						}}
					/>
				)}
				<Separator collapsed={collapsedSidebar}>Tools</Separator>
				<Link href='/games' passHref>
					<NavLink
						active={pathname.includes('/games')}
						onClick={() => closeMenuOnInteraction()}
					>
						<ControllerIcon css={{ marginRight: '6px' }} size={22} /><Text>Games</Text>
					</NavLink>
				</Link>
				<Link href='/404' passHref>
					<NavLink
						active={pathname.includes('/test')}
						onClick={() => closeMenuOnInteraction()}
					>
						<TestTubeIcon css={{ marginRight: '6px' }} size={22} /><Text>Test</Text>
					</NavLink>
				</Link>
				<Link href='/storybook' passHref>
					<NavLink
						active={pathname.includes('/storybook')}
						onClick={() => closeMenuOnInteraction()}
					>
						<PencilRulerIcon css={{ marginRight: '6px' }} size={22} /><Text>Storybook</Text>
					</NavLink>
				</Link>
			</Content>

			<Separator collapsed={collapsedSidebar}>Site</Separator>
			<Link href='/404' passHref>
				<NavLink
					active={pathname.includes('/projects')}
					onClick={() => closeMenuOnInteraction()}
				>
					<ToolsIcon css={{ marginRight: '6px' }} size={22} /><Text>Projects</Text>
				</NavLink>
			</Link>
			<Link href='/about' passHref>
				<NavLink
					active={pathname.includes('/about')}
					onClick={() => closeMenuOnInteraction()}
				>
					<InfoIcon css={{ marginRight: '6px' }} size={22} /><Text>About</Text>
				</NavLink>
			</Link>

			<Content css={{ marginTop: 'auto' }}>
				<Separator slim />
				<ButtonText
					css={{ margin: '6px 12px 7px', height: '35px' }}
					slim
					label={(
						<div css={{ display: 'flex', alignItems: 'center', height: '20px' }}>
							<LightDarkModeIcon css={{ marginRight: '6px' }} />
							{darkTheme ? 'Light theme' : 'Dark theme'}
						</div>
					)}
					onClick={() => updateResponsive({ darkTheme: !darkTheme })}
				/>
				<div css={(theme: Theme) => ({ borderTop: `1px solid ${theme.color.border}` })} />
				{!isMobile && (
					<ButtonIcon
						css={{ margin: '6px 12px', height: '35px' }}
						onClick={() => updateResponsive({ collapsedSidebar: !collapsedSidebar })}
						title='Collapse sidebar'
						label={(
							<div css={(theme: Theme) => ({ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: theme.color.text, marginTop: '2px' })}>
								<ChevronFlip horizontal isActive={collapsedSidebar} />
							</div>
						)}
					/>
				)}
			</Content>
		</Sidebar>
	)
}
