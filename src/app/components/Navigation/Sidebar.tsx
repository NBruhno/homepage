import styled, { css } from 'styled-components'

import { adjustHsl } from 'lib/client'

type Props = {
	isCollapsed?: boolean,
}

const defaultCss = css<Props>`
	align-items: stretch;
	background-color: ${({ theme }) => theme.color.sidebarBackground};
	flex-direction: column;
	justify-content: space-between;
	padding: 0;
	opacity: 0;
	visibility: hidden;
	z-index: 10;
	display: none;

	> ::-webkit-scrollbar {
		width: ${({ isCollapsed }) => isCollapsed ? 0 : '8px'};
	}
`

export const DesktopSidebar = styled.nav<Props>`
	${defaultCss}

	${({ theme }) => theme.mediaQueries.minMobile} {
		display: flex;
		height: 100vh;
		opacity: 1;
		position: sticky;
		top: 0;
		transition: width 300ms ${({ theme }) => theme.animation.default};
		visibility: visible;
		width: ${({ isCollapsed }) => isCollapsed ? '70px' : '250px'};
	}
`

export const MobileSidebar = styled.nav<Props & { show: boolean }>`
	${defaultCss}

	${({ theme }) => theme.mediaQueries.maxMobile} {
		display: flex;
		height: calc(100vh - 53px);
		opacity: 1;
		position: fixed;
		top: 54px;
		transform: ${({ show }) => show ? 'none' : 'translate(-251px)'};
		transition: transform 300ms ${({ theme }) => theme.animation.default};
		visibility: visible;
		width: 250px;

		@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px))) {
			backdrop-filter: saturate(150%) blur(16px) brightness(150%);
			background-color: ${({ theme }) => adjustHsl(theme.color.sidebarBackground, { alpha: 0.9 })};
		}
	}
`
