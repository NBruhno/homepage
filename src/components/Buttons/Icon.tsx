import type { Props as AsyncProps } from './Async'

import { styled, css } from 'styled-components'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from './Async'
import { Label } from './Async/Label'

type Props = AsyncProps & {
	isActive?: boolean,
}

export const ButtonIcon = styled(ButtonAsync)<Props>`
	background-color: transparent;
	border-radius: 4px;
	min-width: 36px;
	padding: 0 8px;
	color: ${({ theme }) => theme.isDarkTheme ? theme.color.text : theme.color.text};
	
	&:disabled {
		color: ${({ theme }) => theme.color.gray040};
	}
	
	&:hover:enabled, &:focus:enabled {
		background-color: ${({ theme }) => adjustHsl(theme.color.primary, { alpha: 0.4 })};
	}
	
	${({ isActive }) => isActive && css`
		background-color: ${({ theme }) => adjustHsl(theme.color.primary, { alpha: 0.4 })};
		
		&:hover:enabled, &:focus:enabled {
			background-color: ${({ theme }) => adjustHsl(theme.color.primary, { alpha: 0.6 })};
		}
	`}

	${Label} {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`
