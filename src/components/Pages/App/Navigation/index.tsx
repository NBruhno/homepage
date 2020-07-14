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
import { Logo } from 'components/Logo'

export const Navigation = () => {
	const { user } = useRefresh()
	const { state: { responsive }, dispatch } = useStore()
	const { logout } = useAuth()
	const { pathname } = useRouter()
	const closeMenuOnInteraction = () => {
		if (responsive.isMobile) {
			dispatch({ responsive: { ...responsive, collapsedSidebar: responsive.isMobile || false } })
		}
	}

	return (
		<Sidebar collapsed={responsive.collapsedSidebar} isMobile={responsive.isMobile}>
			{!responsive.isMobile && (
				<Link href='/' passHref>
					<Header darkTheme={responsive.darkTheme} onClick={() => closeMenuOnInteraction()}>
						<Logo
							css={{
								width: '32px',
								height: '32px',
								margin: responsive.collapsedSidebar ? '0 8px 0 -6px' : '0 6px 0 42px',
								transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1)',
							}}
						/>
						{!responsive.collapsedSidebar && <Text>Bruhno</Text>}
					</Header>
				</Link>
			)}
			<Content css={{ paddingTop: '12px' }}>
				<NavLink onClick={() => closeMenuOnInteraction()}>
					<AccountIcon css={{ marginRight: '6px' }} size={22} />
					{user?.accessToken ? (
						<Text>
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
							onClick={() => closeMenuOnInteraction()}
						>
							<LoginIcon css={{ marginRight: '6px' }} size={22} /><Text>Sign in</Text>
						</NavLink>
					</Link>
				)}
				{user?.accessToken && (
					<ButtonText
						css={{ margin: '4px 12px', height: '35px' }}
						slim
						label={(
							<div css={{ display: 'flex', alignItems: 'center', height: '20px' }}>
								<LogoutIcon css={{ marginRight: '6px' }} />Logout
							</div>
						)}
						onClick={() => {
							closeMenuOnInteraction()
							logout()
						}}
					/>
				)}

				<Separator collapsed={responsive.collapsedSidebar}>{!responsive.collapsedSidebar && <Text>Tools</Text>}</Separator>
				<Link href='/games' passHref>
					<NavLink
						active={pathname === '/games'}
						onClick={() => closeMenuOnInteraction()}
					>
						<GhostIcon css={{ marginRight: '6px' }} size={22} /><Text>Games</Text>
					</NavLink>
				</Link>
				<Link href='/test' passHref>
					<NavLink
						active={pathname === '/test'}
						onClick={() => closeMenuOnInteraction()}
					>
						<TestTubeIcon css={{ marginRight: '6px' }} size={22} /><Text>Test</Text>
					</NavLink>
				</Link>
				<NavLink
					href={config.environment === 'development' ? 'http://localhost:9000' : `/storybook/index.html`}
					onClick={() => closeMenuOnInteraction()}
				>
					<PencilRulerIcon css={{ marginRight: '6px' }} size={22} /><Text>Storybook</Text>
				</NavLink>
			</Content>
			<Content css={{ marginTop: 'auto' }}>
				<Separator slim />
				<ButtonText
					css={{ margin: '6px 12px 7px', height: '35px' }}
					slim
					label={(
						<div css={{ display: 'flex', alignItems: 'center', height: '20px' }}>
							<LightDarkModeIcon css={{ marginRight: '6px' }} />
							{responsive.darkTheme ? 'Light theme' : 'Dark theme'}
						</div>
					)}
					onClick={() => dispatch({ responsive: { ...responsive, darkTheme: !responsive.darkTheme } })}
				/>
				<div css={(theme: Theme) => ({ borderTop: `1px solid ${theme.color.border}` })} />
				{!responsive.isMobile && (
					<ButtonIcon
						css={{ margin: '6px 12px', height: '35px' }}
						onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: !responsive.collapsedSidebar } })}
						label={(
							<div css={(theme: Theme) => ({ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: theme.color.text, marginTop: '2px' })}>
								<ChevronFlip horizontal isActive={responsive.collapsedSidebar} />
							</div>
						)}
					/>
				)}
			</Content>
		</Sidebar>
	)
}
