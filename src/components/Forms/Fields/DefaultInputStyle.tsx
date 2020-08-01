import { css } from '@emotion/core'

type Props = {
	theme: Theme,
	hasError: boolean,
	disabled: boolean,
}

export const DefaultInputStyle = ({ theme, hasError, disabled }: Props) => css({
	position: 'relative',
	fontSize: theme.fontSize.s100,
	fontFamily: theme.fontFamily.roboto,
	textAlign: 'left',
	padding: '10px 6px',
	display: 'block',
	color: theme.color.text,
	backgroundColor: hasError ? theme.color.errorBackground : theme.color.inputBackground,
	margin: '2px 0 -5px',
	width: 'calc(100% - 14px)',
	borderRadius: '4px',
	border: `2px solid ${hasError ? theme.color.error : theme.color.inputBorder}`,
	transition: 'border 135ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 135ms cubic-bezier(0.4, 0, 0.2, 1)',
	WebkitTapHighlightColor: 'transparent',
	outline: 0,

	'::placeholder': {
		color: theme.color.gray,
	},

	'&:hover': {
		borderColor: !hasError && !disabled && theme.color.inputBorderHover,
		backgroundColor: !disabled && hasError ? theme.color.errorBackgroundHover : theme.color.inputBackgroundHover,
	},

	'&:focus': {
		boxShadow: `0 0 0 1px ${hasError ? theme.color.error : theme.color.primary}`,
		backgroundColor: !disabled && hasError ? theme.color.errorBackgroundHover : theme.color.inputBackgroundHover,
		borderColor: !hasError && theme.color.primary,
	},

	'&:disabled': {
		color: theme.color.grayDark,
		backgroundColor: theme.color.grayLight,
		cursor: 'auto',
	},
})
