import { css, keyframes, styled } from 'styled-components'

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
`

export const Container = styled.div`
	animation: ${css`350ms ${({ theme }) => theme.animation.default} ${fadeIn} 1;`};
`
