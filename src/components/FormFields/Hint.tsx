import { styled } from 'styled-components'

export const Hint = styled.span`
	color: ${({ theme }) => theme.color.textFaded};
	flex-shrink: 0;
	font-family: ${({ theme }) => theme.font.family.roboto};
	font-size: ${({ theme }) => theme.font.size.s70};
	vertical-align: 1.5px;
`
