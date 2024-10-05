import type { ReactNode } from 'react'

import { styled } from 'styled-components'

type Props = {
	hasHeader?: ReactNode,
	isVisible: boolean,
}

export const Content = styled.div<Props>`
	opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
	padding: ${({ hasHeader }) => (hasHeader ? 0 : '16px')} 24px 30px;
	transition: opacity 0.2s ease-in-out;
`
