import Link from 'next/link'

import { useResponsive } from 'states/responsive'

import { Logo } from 'components/Logo'

import { ButtonTheme } from './Buttons/Theme'
import { ButtonToggle } from './Buttons/Toggle'
import { Content } from './Content'
import { DefaultNavigation } from './DefaultNavigation'
import { Header } from './Header'
import { DesktopSidebar, MobileSidebar } from './Sidebar'
import { Text } from './Text'

export const Navigation = () => {
	const { isMobile, collapsedSidebar, updateResponsive, showMenu } = useResponsive()
	const closeMenuOnInteraction = () => { if (isMobile) updateResponsive({ showMenu: false }) }

	return (
		<>
			<DesktopSidebar collapsed={collapsedSidebar}>
				<Link href='/' passHref>
					<Header onClick={() => closeMenuOnInteraction()}>
						<Logo css={(theme: Theme) => ({ width: '32px', height: '32px', margin: collapsedSidebar ? '0 8px 0 -6px' : '0 6px 0 42px', transition: `margin 300ms ${theme.animation.default}` })} />
						<Text>Bruhno</Text>
					</Header>
				</Link>
				<DefaultNavigation closeMenuOnInteraction={closeMenuOnInteraction} collapsedSidebar={collapsedSidebar} />
				<Content css={{ marginTop: 'auto' }}>
					<ButtonTheme />
					<ButtonToggle />
				</Content>
			</DesktopSidebar>

			<MobileSidebar show={showMenu}>
				<DefaultNavigation closeMenuOnInteraction={closeMenuOnInteraction} collapsedSidebar={false} />
				<Content css={{ marginTop: 'auto' }}>
					<ButtonTheme />
				</Content>
			</MobileSidebar>
		</>
	)
}
