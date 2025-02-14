import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

type Props = {
	isCollapsed?: boolean
}

const DefaultSidebar = styled.nav<Props>`
	display: none;
	align-items: stretch;
	background-color: ${({ theme }) => theme.color.sidebarBackground};
	flex-direction: column;
	justify-content: space-between;
	padding: 0;
	opacity: 0;
	visibility: hidden;
	z-index: 10;
	

	> ::-webkit-scrollbar {
		width: ${({ isCollapsed }) => (isCollapsed ? 0 : '8px')};
	}
`

export const DesktopSidebar = styled(DefaultSidebar)<Props>`
	${({ theme }) => theme.mediaQueries.minMobile} {
		display: flex;
		height: 100vh;
		opacity: 1;
		position: sticky;
		top: 0;
		transition: width 300ms ${({ theme }) => theme.animation.default};
		visibility: visible;
		width: ${({ isCollapsed }) => (isCollapsed ? '70px' : '250px')};
	}
`

export const MobileSidebar = styled(DefaultSidebar)<Props & { show: boolean }>`
	${({ theme }) => theme.mediaQueries.maxMobile} {
		display: flex;
		height: calc(100vh - 53px);
		opacity: 1;
		position: fixed;
		top: 54px;
		transform: ${({ show }) => (show ? 'none' : 'translate(-251px)')};
		transition: transform 300ms ${({ theme }) => theme.animation.default};
		visibility: visible;
		width: 250px;

		@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px))) {
			backdrop-filter: blur(5px) brightness(150%) saturate(150%);
			background: linear-gradient(154deg, ${({ theme }) => adjustHsl(theme.color.sidebarBackground, { alpha: 0.75 })} 4.87%, ${({ theme }) => adjustHsl(theme.color.sidebarBackground, { alpha: 0.95 })} 75.88%);
		}
	}
`
