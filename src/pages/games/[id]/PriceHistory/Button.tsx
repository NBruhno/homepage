import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from 'components/Buttons/Async'

export const Button = styled(ButtonAsync)`
	width: 100%;
	background-color: transparent;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	font-size: ${({ theme }) => theme.font.size.s90};
	color: ${({ theme }) => theme.color.text};

	&:hover, &:focus, &:active {
		background-color: ${({ theme }) => adjustHsl(theme.color.primary, { alpha: 0.3 })};
		border-color: ${({ theme }) => theme.color.primary};
	}
`
