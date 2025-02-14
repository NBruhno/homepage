import { styled } from 'styled-components'

export const MultiplayerMode = styled.div`
	margin-bottom: 12px;
	padding-bottom: 12px;
	border-bottom: 1px solid ${({ theme }) => theme.color.gray020};

	&:last-of-type {
		border-bottom: none;
		padding-bottom: 0;
		margin-bottom: 0;
	}
`
