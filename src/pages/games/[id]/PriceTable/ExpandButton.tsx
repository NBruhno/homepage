import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from 'components/Buttons/Async'

export const ExpandButton = styled(ButtonAsync)`
	background-color: transparent;
	border: none;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	border-top: 1px solid ${({ theme }) => theme.color.border};
	font-size: ${({ theme }) => theme.font.size.s90};
	color: ${({ theme }) => theme.color.text};
	cursor: pointer;
	height: 36px;
	outline: none;
	width: 100%;

	&:hover, &:focus, &:active {
		background-color: ${({ theme }) => adjustHsl(theme.color.primary, { alpha: 0.3 })};
		border-color: ${({ theme }) => theme.color.primary};
	}
`
