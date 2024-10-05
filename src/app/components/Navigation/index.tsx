import { useResponsive } from 'states/page'

import { Logo } from 'components/Logo'

import { ButtonTheme } from './Buttons/Theme'
import { ButtonToggle } from './Buttons/Toggle'
import { Content } from './Content'
import { DefaultNavigation } from './DefaultNavigation'
import { Header } from './Header'
import { DesktopSidebar, MobileSidebar } from './Sidebar'
import { Text } from './Text'

export const Navigation = () => {
	const { isMobile, isSidebarCollapsed, setResponsiveState, showMenu } = useResponsive()
	const closeMenuOnInteraction = () => isMobile ? setResponsiveState({ showMenu: false }) : undefined

	return (
		<>
			<DesktopSidebar isCollapsed={isSidebarCollapsed}>
				<Header href='/' onClick={() => closeMenuOnInteraction()}>
					<Logo css={(theme) => ({ width: '32px', height: '32px', margin: isSidebarCollapsed ? '0 8px 0 -1px' : '0 6px 0 42px', transition: `margin 300ms ${theme.animation.default}` })} />
					<Text>Bruhno</Text>
				</Header>
				<DefaultNavigation isSidebarCollapsed={isSidebarCollapsed} />
				<Content css={{ marginTop: 'auto' }}>
					<ButtonTheme />
					<ButtonToggle />
				</Content>
			</DesktopSidebar>

			<MobileSidebar show={showMenu}>
				<DefaultNavigation isSidebarCollapsed={false} />
				<Content css={{ marginTop: 'auto' }}>
					<ButtonTheme />
				</Content>
			</MobileSidebar>
		</>
	)
}
