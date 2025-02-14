import { css, keyframes, styled } from 'styled-components'

const load = keyframes`
	0% {
		left: 0%;
		right: 100%;
		width: 0%;
	}
	20% {
		left: 0%;
		right: 65%;
		width: 45%;
	}
	80% {
		right: 0%;
		left: 65%;
		width: 45%;
	}
	100% {
		left: 100%;
		right: 0%;
		width: 0%;
	}
`

type Props = {
	isLoading: boolean
}

export const Bar = styled.div<Props>`
	position: absolute;
	top: 0;
	left: 0;
	right: 100%;
	width: 0;
	height: 2px;
	background-color: ${({ theme }) => theme.color.primaryLighter};
	display: ${({ isLoading }) => (isLoading ? 'inline' : 'none')};
	animation: ${({ isLoading }) => (isLoading ? css`${load} 1s linear infinite;` : undefined)};
`
