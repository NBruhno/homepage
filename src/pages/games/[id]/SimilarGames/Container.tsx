import { styled } from 'styled-components'

export const Container = styled.div`
	display: grid;
	gap: 11px;
	grid-template-columns: repeat(auto-fill, 120px);

	${({ theme }) => theme.mediaQueries.maxMobile} {
		gap: 12px;
		grid-template-columns: repeat(auto-fill, 48%);
	}
`
