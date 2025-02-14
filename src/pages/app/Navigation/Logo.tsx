import { styled } from 'styled-components'

import { Logo as DefaultLogo } from 'components/Logo'

type Props = {
	isSidebarCollapsed: boolean
}

export const Logo = styled(DefaultLogo)<Props>`
	width: 32px;
	height: 32px;
	margin: ${({ isSidebarCollapsed }) => (isSidebarCollapsed ? '0 8px 0 -1px' : '0 6px 0 42px')};
	transition: margin 300ms ${({ theme }) => theme.animation.default};
`
