import { styled } from 'styled-components'

import { ButtonIcon } from 'components/Buttons'
import { Label } from 'components/Buttons/Async/Label'

type Props = {
	isHighlighted: boolean
}

export const ButtonClear = styled(ButtonIcon)<Props>`
	width: 22px;
	height: 22px;
	min-width: auto;
	padding: 0;
	border-radius: 0 4px 4px 0;
	color: ${({ theme, isHighlighted }) => (isHighlighted ? theme.color.error : theme.color.gray050)};
	background-color: ${({ theme, isHighlighted }) => (isHighlighted ? theme.color.errorBackgroundHover : 'transparent')};

	&:focus:enabled, &:active:enabled {
		background-color: transparent;
		outline: none;
	}

	&:hover:enabled {
		background-color: ${({ theme }) => theme.color.errorBackgroundHover};
		color: ${({ theme }) => theme.color.error};
	}

	${Label} {
		padding: 3px 2px;
	}
`
