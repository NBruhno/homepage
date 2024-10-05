import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from './Async'

type Props = {
	isSlim?: boolean,
}

export const ButtonText = styled(ButtonAsync)<Props>`
	background-color: transparent;
	border-radius: 4px;
	color: ${({ theme }) => theme.color.text};
	padding: 6px 12px;
	margin: 4px 0;
	min-width: 0px;
	height: ${({ isSlim }) => isSlim ? '35px' : 'unset'};
	font-size: ${({ theme, isSlim }) => isSlim ? theme.font.size.s90 : theme.font.size.s100};
	
	&:disabled {
		color: ${({ theme }) => adjustHsl(theme.color.white, { alpha: 0.3 })};
		background-color: ${({ theme }) => theme.color.gray};
	}

	&:hover:enabled, &:focus:enabled {
		background-color: ${({ theme }) => adjustHsl(theme.color.primary, { alpha: 0.4 })};
	}
`
