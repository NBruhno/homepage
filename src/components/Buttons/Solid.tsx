import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from './Async'

export const ButtonSolid = styled(ButtonAsync)`
	background-color: ${({ theme }) => theme.color.primary};
	border-radius: 4px;
	color: ${({ theme }) => theme.color.black};

	&:disabled {
		color: ${({ theme }) => theme.color.gray040};
		background-color: ${({ theme }) => theme.color.gray020};
	}

	&:hover:enabled {
		background-color: ${({ theme }) => adjustHsl(theme.color.primary, { light: '60%' })};
	}
`
