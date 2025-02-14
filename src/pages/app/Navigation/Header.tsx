import NextLink from 'next/link'
import { styled } from 'styled-components'

const Component = styled(NextLink)`
	align-items: center;
	background-color: ${({ theme }) => theme.color.sidebarBackground};
	color: ${({ theme }) => (theme.isDarkTheme ? theme.color.text : theme.color.textInverted)};
	display: flex;
	flex-shrink: 0;
	font-family: ${({ theme }) => theme.font.family.poppins};
	height: 35px;
	padding: 12px 24px;
	text-decoration: none;
	width: auto;
`

export const Header = Component
