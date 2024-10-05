import styled from 'styled-components'

import { Logo as DefaultLogo } from 'components/Logo'

export const Logo = styled(DefaultLogo)`
	width: 32px;
	height: 32px;
	margin: 0 8px 0 -6px;
	transition: margin 300ms ${({ theme }) => theme.animation.default};
`
