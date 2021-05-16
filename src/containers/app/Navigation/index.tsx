import Link from 'next/link'

import { useDarkMode } from 'states/darkMode'
import { useResponsive } from 'states/responsive'

import { ButtonText, ButtonIcon } from 'components/Buttons'
import { ChevronFlip } from 'components/ChevronFlip'
import { SunIcon, MoonIcon } from 'components/Icons'
import { Logo } from 'components/Logo'

import { Content } from './Content'
import { DefaultNavigation } from './DefaultNavigation'
import { Header } from './Header'
import { Separator } from './Separator'
import { DesktopSidebar, MobileSidebar } from './Sidebar'
import { Text } from './Text'

export const Navigation = () => {
	const { isMobile, collapsedSidebar, updateResponsive, showMenu, showLogin } = useResponsive()
	const { globalTheme, toggleTheme } = useDarkMode()
	const closeMenuOnInteraction = () => { if (isMobile) updateResponsive({ showMenu: false }) }

	const ThemeButton = () => (
		<>
			<Separator slim />
			<ButtonText
				css={{ margin: '6px 12px 7px', height: '35px' }}
				slim
				label={(
					<div css={{ display: 'flex', alignItems: 'center', height: '20px' }}>
						{globalTheme === 'light' ? <MoonIcon css={{ marginRight: '12px' }} /> : <SunIcon css={{ marginRight: '12px' }} />}
						{globalTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
					</div>
				)}
				onClick={() => toggleTheme()}
			/>
		</>
	)

	return (
		<>
			<DesktopSidebar collapsed={collapsedSidebar}>
				<Link href='/' passHref>
					<Header onClick={() => closeMenuOnInteraction()}>
						<Logo css={(theme: Theme) => ({ width: '32px', height: '32px', margin: collapsedSidebar ? '0 8px 0 -6px' : '0 6px 0 42px', transition: `margin 300ms ${theme.animation.default}` })} />
						<Text>Bruhno</Text>
					</Header>
				</Link>
				<DefaultNavigation
					closeMenuOnInteraction={closeMenuOnInteraction}
					collapsedSidebar={collapsedSidebar}
					showLogin={showLogin}
					updateResponsive={updateResponsive}
				/>
				<Content css={{ marginTop: 'auto' }}>
					<ThemeButton />
					<div css={(theme: Theme) => ({ borderTop: `1px solid ${theme.color.border}` })} />
					<ButtonIcon
						css={{ margin: '6px 12px', height: '35px' }}
						onClick={() => updateResponsive({ collapsedSidebar: !collapsedSidebar })}
						title={collapsedSidebar ? 'Expand sidebar' : 'Collapse sidebar'}
						label={(
							<div css={(theme: Theme) => ({ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: theme.color.text, marginTop: '2px' })}>
								<ChevronFlip slim horizontal isActive={collapsedSidebar} />
							</div>
						)}
					/>
				</Content>
			</DesktopSidebar>

			<MobileSidebar show={showMenu}>
				<DefaultNavigation
					closeMenuOnInteraction={closeMenuOnInteraction}
					collapsedSidebar={false}
					showLogin={showLogin}
					updateResponsive={updateResponsive}
				/>
				<Content css={{ marginTop: 'auto' }}>
					<ThemeButton />
				</Content>
			</MobileSidebar>
		</>
	)
}
