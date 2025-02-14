import { styled } from 'styled-components'

export const Title = styled.h4`
	margin: 0 0 4px;
	font-size: ${({ theme }) => theme.font.size.s80};
	color: ${({ theme }) => theme.color.textSubtitle};
`
