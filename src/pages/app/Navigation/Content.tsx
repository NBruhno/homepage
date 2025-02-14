import { styled } from 'styled-components'

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;

	&:first-of-type {
		overflow-x: hidden;
		overflow-y: auto;
	}
`
