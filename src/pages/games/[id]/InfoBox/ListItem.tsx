import { styled } from 'styled-components'

export const ListItem = styled.li`
	color: ${({ theme }) => theme.color.text};
	margin-bottom: 8px;
	&:last-child {
		margin: 0;
	}
`
