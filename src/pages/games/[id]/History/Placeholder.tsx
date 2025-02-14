import { styled } from 'styled-components'

export const Placeholder = styled.div`
	height: 250px;
	background-color: ${({ theme }) => theme.color.textFaded};
	opacity: 0.2;
	border-radius: 4px;
`
