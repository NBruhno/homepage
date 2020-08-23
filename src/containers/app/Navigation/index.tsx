import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from 'states/auth'
import { useRefresh } from 'states/refresh'
import { useResponsive } from 'states/responsive'

import { ChevronFlip } from 'components/ChevronFlip'
import { ButtonText, ButtonIcon } from 'components/Buttons'
import { LoginIcon, PencilRulerIcon, LightDarkModeIcon, TestTubeIcon, ControllerIcon, AccountIcon, LogoutIcon, InfoIcon, ToolsIcon } from 'components/Icons'
import { Placeholder } from 'components/Placeholder'
import { Logo } from 'components/Logo'

import { Content } from './Content'
import { Header } from './Header'
import { NavLink } from '../NavLink'
import { Separator } from './Separator'
import { DesktopSidebar, MobileSidebar } from './Sidebar'
import { Text } from './Text'

export const Navigation = () => {
	const { user } = useRefresh()
	const { isMobile, collapsedSidebar, darkTheme, updateResponsive, showLogin, showMenu } = useResponsive()
	const { logout } = useAuth()
	const { pathname } = useRouter()
	const closeMenuOnInteraction = () => {
		if (isMobile) updateResponsive({ showMenu: false })
	}

	return (
		<>
			<DesktopSidebar collapsed={collapsedSidebar}>
				<Link href='/' passHref>
					<Header onClick={() => closeMenuOnInteraction()}>
						<Logo
							css={(theme: Theme) => ({
								width: '32px',
								height: '32px',
								margin: collapsedSidebar ? '0 8px 0 -6px' : '0 6px 0 42px',
								transition: `margin 300ms ${theme.animation.default}`,
							})}
						/>
						<Text>Bruhno</Text>
					</Header>
				</Link>
				<Content css={{ paddingTop: '12px' }}>
					<Link href='/users/profile' passHref>
						<NavLink
							active={pathname.includes('/users/profile')}
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
								if (isMobile) {
									updateResponsive({ showLogin: !showLogin, collapsedSidebar: true })
								} else {
									updateResponsive({ showLogin: !showLogin })
								}
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
				</Content>
			</DesktopSidebar>
			<MobileSidebar show={showMenu}>
				<Content css={{ paddingTop: '12px' }}>
					<Link href='/users/profile' passHref>
						<NavLink
							active={pathname.includes('/users/profile')}
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
								if (isMobile) {
									updateResponsive({ showLogin: !showLogin, showMenu: false })
								} else {
									updateResponsive({ showLogin: !showLogin })
								}
							}}
						/>
					)}
					<Separator collapsed={false}>Tools</Separator>
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

				<Separator collapsed={false}>Site</Separator>
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
				</Content>
			</MobileSidebar>
		</>
	)
}
