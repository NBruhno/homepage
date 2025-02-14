import { useResponsive } from 'states/page'
import { ButtonTheme } from './Buttons/Theme'
import { ButtonToggle } from './Buttons/Toggle'
import { Content } from './Content'
import { DefaultNavigation } from './DefaultNavigation'
import { Header } from './Header'
import { Logo } from './Logo'
import { DesktopSidebar, MobileSidebar } from './Sidebar'
import { Text } from './Text'

export const Navigation = () => {
	const { isMobile, isSidebarCollapsed, setResponsiveState, showMenu } = useResponsive()
	const closeMenuOnInteraction = () => (isMobile ? setResponsiveState({ showMenu: false }) : undefined)

	return (
		<>
			<DesktopSidebar isCollapsed={isSidebarCollapsed}>
				<Header href='/' onClick={() => closeMenuOnInteraction()}>
					<Logo isSidebarCollapsed={isSidebarCollapsed} />
					<Text>Bruhno</Text>
				</Header>
				<DefaultNavigation isSidebarCollapsed={isSidebarCollapsed} />
				<Content style={{ marginTop: 'auto' }}>
					<ButtonTheme />
					<ButtonToggle />
				</Content>
			</DesktopSidebar>

			<MobileSidebar show={showMenu}>
				<DefaultNavigation isSidebarCollapsed={false} />
				<Content style={{ marginTop: 'auto' }}>
					<ButtonTheme />
				</Content>
			</MobileSidebar>
		</>
	)
}
