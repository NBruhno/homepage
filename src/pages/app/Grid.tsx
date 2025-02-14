import { styled } from 'styled-components'

type Props = {
	isNebulaVisible: boolean
}

export const Grid = styled.div<Props>`
	background-color: ${({ isNebulaVisible, theme }) => (isNebulaVisible ? 'transparent' : theme.color.background)};
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: 1fr;
	max-width: 100vw;
	min-height: 100vh;
	position: relative;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
	}
`
