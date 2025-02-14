import { styled } from 'styled-components'

export const Games = styled.div`
	display: grid;
	justify-content: space-between;
	column-gap: 10px;
	row-gap: 8px;
	grid-template-columns: repeat(auto-fill, 71px);

	${({ theme }) => theme.mediaQueries.maxMobile} {
		grid-template-columns: repeat(auto-fill, 18%);
	}
`
