import { css, keyframes, styled } from 'styled-components'

const fadeIn = keyframes`
	0% { opacity: 0; }
`

export const Error = styled.div`
	align-items: center;
	animation: ${css`${fadeIn} 0.2s;`} 0.2s;
	display: flex;
	flex-direction: column;
	font-size: ${({ theme }) => theme.font.size.s80};
	justify-content: center;
	min-height: 200px;
	opacity: 0.6;
`
