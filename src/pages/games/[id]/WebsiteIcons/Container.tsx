import { styled } from 'styled-components'

export const Container = styled.div`
	grid-gap: 6px;
	display: flex;
	overflow: hidden;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		justify-content: center;
	}
`
