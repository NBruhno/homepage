import { styled } from 'styled-components'

export const Empty = styled.div`
	background-color: ${({ theme }) => theme.color.input.background};
	color: ${({ theme }) => theme.color.text};
	opacity: 0.6;
	text-align: center;
	font-weight: ${({ theme }) => theme.font.weight.regular};
	padding: 12px;
	border-radius: 4px;
`
