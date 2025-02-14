import { styled } from 'styled-components'

export const Item = styled.div`
	padding: 6px 10px;
	border-right: 1px solid ${({ theme }) => theme.color.border};
	max-height: 86px;
	overflow: none;

	&:last-child {
		border-right: none;
	}
`
