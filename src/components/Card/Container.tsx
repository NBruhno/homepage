import { styled } from 'styled-components'

export const Container = styled.div`
	background-color: ${({ theme }) => theme.color.background};
	border: 1px solid ${({ theme }) => theme.color.gray020};
	border-radius: 8px;
	margin: 8px 0;
	overflow-wrap: break-word;
	transition: height 135ms ${({ theme }) => theme.animation.default};
	word-break: break-word;
`
