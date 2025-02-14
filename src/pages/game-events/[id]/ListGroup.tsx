import { styled } from 'styled-components'

export const ListGroup = styled.div`
	display: flex;
	column-gap: 24px;

	${({ theme }) => theme.mediaQueries.maxTablet} {
		flex-direction: column;
	}
`
