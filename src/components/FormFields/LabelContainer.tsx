import { styled } from 'styled-components'

export const LabelContainer = styled.label`
	color: ${({ theme }) => theme.color.textFaded};
	display: flex;
	flex-direction: column;
	font-size: ${({ theme }) => theme.font.size.s100};
	font-weight: ${({ theme }) => theme.font.weight.regular};
	text-align: left;
	margin-bottom: 0;
`
