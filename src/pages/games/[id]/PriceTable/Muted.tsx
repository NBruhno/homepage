import { styled } from 'styled-components'

export const Muted = styled.div`
	color: ${({ theme }) => theme.color.text};
	font-size: ${({ theme }) => theme.font.size.s90};
	opacity: 0.7;
	text-align: center;
	line-height: 32px;
	border-top: 1px solid ${({ theme }) => theme.color.gray020};
	height: 32px;
`
