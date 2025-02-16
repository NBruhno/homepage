import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from './Async'

export const ButtonBorder = styled(ButtonAsync)`
	background-color: transparent;
	border: 1px solid ${({ theme }) => theme.color.primary};
	border-radius: 4px;
	color: ${({ theme }) => theme.color.text};

	&:disabled {
		color: ${({ theme }) => theme.color.gray040};
		background-color: transparent;
		border: 1px solid ${({ theme }) => theme.color.gray040};
	}

	&:hover:enabled {
		background-color: ${({ theme }) => adjustHsl(theme.color.primary, { alpha: 0.4 })};
	}

	&::after {
		inset: -3px;
		border-radius: 6px;
	}
`
