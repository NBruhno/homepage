import { css } from 'styled-components'

import { adjustHsl } from 'lib/client'

type Props = {
	hasError: boolean,
	isDisabled: boolean,
	isFocusVisible: boolean,
	isHovered: boolean,
}

export const DefaultInputStyle = css<Props>`
	background-color: ${({ theme, hasError, isDisabled, isHovered, isFocusVisible }) => {
		if ((isHovered || isFocusVisible) && !isDisabled) return hasError ? theme.color.input.backgroundErrorHover : theme.color.input.backgroundHover
		return hasError ? theme.color.input.backgroundError : theme.color.input.background
	}};
	border: 2px solid ${({ theme, hasError, isDisabled, isHovered, isFocusVisible }) => {
		if ((isHovered || isFocusVisible) && !isDisabled) return hasError ? theme.color.input.borderError : theme.color.input.focus
		return hasError ? theme.color.input.borderError : theme.color.input.border
	}};
	border-radius: 4px;
	color: ${({ theme }) => theme.color.text};
	display: block;
	font-family: ${({ theme }) => theme.font.family.roboto};
	font-size: ${({ theme }) => theme.font.size.s100};
	margin: 0 0 -5px;
	padding: 10px 6px;
	position: relative;
	text-align: left;
	transition: border 135ms ${({ theme }) => theme.animation.default}, box-shadow 135ms ${({ theme }) => theme.animation.default}, background-color 135ms ${({ theme }) => theme.animation.default};
	-webkit-tap-highlight-color: transparent;
	width: calc(100% - 14px);
	min-height: 22px;
	outline: none;

	&::placeholder {
		color: ${({ theme, hasError }) => hasError ? adjustHsl(theme.color.grayLight, { alpha: 0.65 }) : theme.color.gray};
	}

	&:disabled {
		background-color: ${({ theme }) => theme.color.grayLight};
		color: ${({ theme }) => theme.color.grayDark};
		cursor: auto;
	}

	&:focus {
		border-color: ${({ theme, hasError }) => hasError ? theme.color.error : theme.color.primary};
	}

	${({ isFocusVisible }) => isFocusVisible && css`
		outline: ${({ theme }) => `${theme.color.focusOutline} solid 2px`};
		outline-offset: 2px;
	`}

	// '::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
	// 	WebkitAppearance: 'none',
	// 	margin: 0,
	// },

	// 'input[type=number]': {
	// 	MozAppearance: 'textfield',
	// },
`
