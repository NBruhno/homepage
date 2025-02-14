import { styled } from 'styled-components'

export const Caption = styled.div`
	font-size: ${({ theme }) => theme.font.size.s80};
	font-family: ${({ theme }) => theme.font.family.poppins};
	color: ${({ theme }) => theme.color.textFaded};
	margin: 0 0 8px;
`
