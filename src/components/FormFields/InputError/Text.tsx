import { styled } from 'styled-components'

export const Text = styled.span`
	color: ${({ theme }) => theme.color.white};
	font-size: ${({ theme }) => theme.font.size.s80};
	margin-left: 5px;
	vertical-align: 5px;
`
