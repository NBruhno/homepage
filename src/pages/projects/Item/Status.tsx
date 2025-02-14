import { styled } from 'styled-components'

export const Status = styled.span`
	background-color: ${({ theme }) => (theme.isDarkTheme ? theme.color.grayDark : theme.color.grayDarker)};
	border-radius: 4px;
	font-size: ${({ theme }) => theme.font.size.s70};
	font-family: ${({ theme }) => theme.font.family.roboto};
	margin-left: 6px;
	padding: 3px 6px;
`
