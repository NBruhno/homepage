import { keyframes } from '@emotion/core'

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
`

type Props = {
	children: React.ReactNode,
}

export const ProjectList = ({ children }: Props) => (
	<div css={(theme: Theme) => ({ animation: `350ms ${theme.animation.default} ${fadeIn} 1` })}>
		{children}
	</div>
)
