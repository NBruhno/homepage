import { styled } from 'styled-components'

export const MainContent = styled.main`
	color: ${({ theme }) => theme.color.text};
	position: relative;
	display: grid;
	grid-template-rows: 1fr auto;
`
