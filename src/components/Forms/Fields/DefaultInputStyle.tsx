import { css } from '@emotion/react'

type Props = {
	theme: Theme,
	hasError: boolean,
	disabled: boolean,
}

export const DefaultInputStyle = ({ theme, hasError, disabled }: Props) => css({
	backgroundColor: hasError ? theme.color.errorBackground : theme.color.inputBackground,
	border: `2px solid ${hasError ? theme.color.error : theme.color.inputBorder}`,
	borderRadius: '4px',
	color: theme.color.text,
	display: 'block',
	fontFamily: theme.fontFamily.roboto,
	fontSize: theme.fontSize.s100,
	margin: '2px 0 -5px',
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

	'&:hover': {
		backgroundColor: !disabled && hasError ? theme.color.errorBackgroundHover : theme.color.inputBackgroundHover,
		borderColor: !hasError && !disabled && theme.color.inputBorderHover,
	},

	'&:focus': {
		backgroundColor: !disabled && hasError ? theme.color.errorBackgroundHover : theme.color.inputBackgroundHover,
		borderColor: !hasError && theme.color.primary,
		boxShadow: `0 0 0 1px ${hasError ? theme.color.error : theme.color.primary}`,
	},

	'&:disabled': {
		backgroundColor: theme.color.grayLight,
		color: theme.color.grayDark,
		cursor: 'auto',
	},
})
