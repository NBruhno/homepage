import { styled } from 'styled-components'

export const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 8px;
	row-gap: 24px;

	${({ theme }) => theme.mediaQueries.maxDesktop} {
		grid-template-columns: 1fr;
	}
`
