import NextLink from 'next/link'

import { adjustHsl } from 'lib/client'
import { styled } from 'styled-components'

type Props = {
	isActive?: boolean
}

export const NavLink = styled(NextLink)<Props>`
	padding: 6px 12px;
	color: ${({ theme }) => (theme.isDarkTheme ? theme.color.text : theme.color.textInverted)};
	text-decoration: none;
	background-color: ${({ isActive, theme }) => (isActive ? adjustHsl(theme.color.primary, { alpha: 0.4 }) : 'transparent')};
	border-radius: 4px;
	margin: 4px 12px;
	transition: color 135ms ${({ theme }) => theme.animation.default}, background-color 135ms ${({ theme }) => theme.animation.default};
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-size: ${({ theme }) => theme.font.size.s90};
	display: flex;
	column-gap: 12px;

	&:hover, &:focus {
		background-color: ${({ isActive, theme }) => (isActive ? adjustHsl(theme.color.primary, { alpha: 0.8 }) : adjustHsl(theme.color.primary, { alpha: 0.4 }))};
	}
`
