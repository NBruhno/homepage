import { css } from '@emotion/react'

type Props = {
	theme: Theme,
	hasError: boolean,
	isDisabled: boolean,
	isHovered: boolean,
	isFocusVisible: boolean,
}

export const DefaultInputStyle = ({ theme, hasError, isDisabled, isHovered, isFocusVisible }: Props) => css({
	backgroundColor: (() => {
		if ((isHovered || isFocusVisible) && !isDisabled) return hasError ? theme.color.errorBackgroundHover : theme.color.inputBackgroundHover
		return hasError ? theme.color.errorBackground : theme.color.inputBackground
	})(),
	border: `2px solid ${(() => {
		if ((isHovered || isFocusVisible) && !isDisabled) return theme.color.primary
		return hasError ? theme.color.error : theme.color.inputBorder
	})()}`,
	borderRadius: '4px',
	boxShadow: (() => {
		if (isFocusVisible) return hasError ? `0 0 0 2px ${theme.color.error}` : `0 0 0 1px ${isDisabled ? 'transparent' : theme.color.primary}`
		return 'none'
	})(),
	color: theme.color.text,
	display: 'block',
	fontFamily: theme.font.family.roboto,
	fontSize: theme.font.size.s100,
	margin: '0 0 -5px',
	outline: 0,
	padding: '10px 6px',
	position: 'relative',
	textAlign: 'left',
	transition: `border 135ms ${theme.animation.default}, box-shadow 135ms ${theme.animation.default}`,
	WebkitTapHighlightColor: 'transparent',
	width: 'calc(100% - 14px)',

	'::placeholder': {
		color: theme.color.gray,
	},

	'&:disabled': {
		backgroundColor: theme.color.grayLight,
		color: theme.color.grayDark,
		cursor: 'auto',
	},

	'&:focus:active': {
		borderColor: theme.color.primary,
	},

	// '::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
	// 	WebkitAppearance: 'none',
	// 	margin: 0,
	// },

	// 'input[type=number]': {
	// 	MozAppearance: 'textfield',
	// },
})
