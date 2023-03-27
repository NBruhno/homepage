import { css } from '@emotion/react'

import { adjustHsl } from 'lib/client'

type Props = {
	theme: Theme,
	hasError: boolean,
	isDisabled: boolean,
	isHovered: boolean,
	isFocusVisible: boolean,
}

export const DefaultInputStyle = ({ theme, hasError, isDisabled, isHovered, isFocusVisible }: Props) => css([
	{
		backgroundColor: (() => {
			if ((isHovered || isFocusVisible) && !isDisabled) return hasError ? theme.color.input.backgroundErrorHover : theme.color.input.backgroundHover
			return hasError ? theme.color.input.backgroundError : theme.color.input.background
		})(),
		border: `2px solid ${(() => {
			if ((isHovered || isFocusVisible) && !isDisabled) return hasError ? theme.color.input.borderError : theme.color.input.focus
			return hasError ? theme.color.input.borderError : theme.color.input.border
		})()}`,
		borderRadius: '4px',
		color: theme.color.text,
		display: 'block',
		fontFamily: theme.font.family.roboto,
		fontSize: theme.font.size.s100,
		margin: '0 0 -5px',
		padding: '10px 6px',
		position: 'relative',
		textAlign: 'left',
		transition: `
			border 135ms ${theme.animation.default},
			box-shadow 135ms ${theme.animation.default},
			background-color 135ms ${theme.animation.default}`,
		WebkitTapHighlightColor: 'transparent',
		width: 'calc(100% - 14px)',
		minHeight: '22px',
		outline: 'none',

		'::placeholder': {
			color: hasError ? adjustHsl(theme.color.grayLight, { alpha: 0.65 }) : theme.color.gray,
		},

		'&:disabled': {
			backgroundColor: theme.color.grayLight,
			color: theme.color.grayDark,
			cursor: 'auto',
		},

		'&:focus': {
			borderColor: hasError ? theme.color.error : theme.color.primary,
		},

		// '::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
		// 	WebkitAppearance: 'none',
		// 	margin: 0,
		// },

		// 'input[type=number]': {
		// 	MozAppearance: 'textfield',
		// },
	},
	isFocusVisible && {
		outline: `${theme.color.focusOutline} solid 2px`,
		outlineOffset: '2px',
	},
])
