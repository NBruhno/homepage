import { styled } from 'styled-components'

type Props = {
	showPlaceholder: boolean
}

export const LoaderWrapper = styled.div<Props>`
	left: 50%;
	opacity: ${({ showPlaceholder }) => (showPlaceholder ? 1 : 0)};
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	transition: opacity 0.2s ${({ theme }) => theme.animation.default};
`
