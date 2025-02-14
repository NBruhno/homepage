import { styled } from 'styled-components'

export const ListItem = styled.li`
	border-right: 1px solid ${({ theme }) => theme.color.gray020};
	padding: 0 12px;
	display: inline-flex;

	&:last-of-type {
		border-right: none;
	}
`
