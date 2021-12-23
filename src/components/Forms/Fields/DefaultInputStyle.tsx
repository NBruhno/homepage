import { css } from '@emotion/react'

type Props = {
	theme: Theme,
	hasError: boolean,
	isDisabled: boolean,
}

export const DefaultInputStyle = ({ theme, hasError, isDisabled }: Props) => css({
	backgroundColor: hasError ? theme.color.errorBackground : theme.color.inputBackground,
	border: `2px solid ${hasError ? theme.color.error : theme.color.inputBorder}`,
	borderRadius: '4px',
	color: theme.color.text,
	display: 'block',
	fontFamily: theme.font.family.roboto,
	fontSize: theme.font.size.s100,
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
		backgroundColor: (!isDisabled && hasError) ? theme.color.errorBackgroundHover : theme.color.inputBackgroundHover,
		borderColor: (!isDisabled && hasError) ? theme.color.error : theme.color.inputBorderHover,
	},

	'&:focus': {
		backgroundColor: (!isDisabled && hasError) ? theme.color.errorBackgroundHover : theme.color.inputBackgroundHover,
		borderColor: !hasError ? theme.color.primary : 'transparent',
		boxShadow: hasError ? `0 0 0 2px ${theme.color.error}` : `0 0 0 1px ${isDisabled ? 'transparent' : theme.color.primary}`,
	},

	'&:disabled': {
		backgroundColor: theme.color.grayLight,
		color: theme.color.grayDark,
		cursor: 'auto',
	},
})
