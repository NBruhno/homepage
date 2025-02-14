import { styled } from 'styled-components'

export const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 16px;

	${({ theme }) => theme.mediaQueries.maxTablet} {
		grid-template-columns: 1fr;
	}
`
