import { styled } from 'styled-components'

export const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 16px;

	${({ theme }) => theme.mediaQueries.maxDesktop} {
		grid-template-columns: auto;
	}
`
