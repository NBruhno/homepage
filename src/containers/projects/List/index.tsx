import type { ReactNode } from 'react'

import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
`

type Props = {
	children: ReactNode,
}

export const ProjectList = ({ children }: Props) => (
	<div css={(theme) => ({ animation: `350ms ${theme.animation.default} ${fadeIn} 1` })}>
		{children}
	</div>
)
