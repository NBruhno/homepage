import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

type Props = {
	isDisabled: boolean
	hasError: boolean
	shouldFill?: boolean
}

export const InputComponent = styled.input.attrs<Props>(({ isDisabled }) => ({
	disabled: isDisabled,
}))<Props>`
	background-color: transparent;
	border: none;
	color: ${({ theme }) => theme.color.text};
	font-family: ${({ theme }) => theme.font.family.roboto};
	font-size: ${({ theme }) => theme.font.size.s100};
	-webkit-tap-highlight-color: transparent;
	display: block;
	width: ${({ shouldFill }) => (shouldFill ? '100%' : 'max-content')};

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: ${({ hasError, theme }) => (hasError ? adjustHsl(theme.color.grayLight, { alpha: 0.65 }) : theme.color.gray)};
	}
`
