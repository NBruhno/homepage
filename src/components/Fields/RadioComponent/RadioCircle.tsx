import { lighten, transparentize } from 'polished'

export type Props = {
	focus: boolean,
	hasError: boolean,
	checked: boolean,
	disabled: boolean,
} & React.ComponentProps<'div'>

export const RadioCircle = ({ focus, hasError, checked, disabled, ...rest }: Props) => {
	const boxShadow = (theme: Theme) => {
		if (focus) {
			return hasError ? `0 0 0 2px ${theme.color.error}` : `0 0 0 2px ${transparentize(0.8, theme.color.primary)}`
		} else {
			return 'none'
		}
	}

	const border = (theme: Theme) => {
		if (disabled && checked) {
			return lighten(0.2, theme.color.primary)
		} else if (checked || focus) {
			return theme.color.primary
		} else if (hasError) {
			return theme.color.error
		} else {
			return theme.color.gray
		}
	}

	const backgroundColor = (theme: Theme) => {
		if (disabled) {
			return hasError ? lighten(0.33, theme.color.error) : theme.color.grayLight
		} else {
			return hasError ? lighten(0.33, theme.color.error) : theme.color.white
		}
	}

	// const borderColor = (theme: Theme) => {
	// 	if (disabled || hasError) {
	// 		return 'initial'
	// 	}	else if (checked && focus) {
	// 		return 'transparent'
	// 	} else {
	// 		return theme.color.primary
	// 	}
	// }

	return (
		<div
			css={(theme: Theme) => ({
				cursor: disabled ? 'auto' : 'pointer',
				position: 'relative',
				boxShadow: boxShadow(theme),
				border: `1px solid ${border(theme)}`,
				borderRadius: '12px',
				width: '22px',
				height: '22px',
				backgroundColor: backgroundColor(theme),
				outline: 0,
				flexShrink: 0,
				margin: '1px 7px 1px 0',

				transition: 'boxShadow 0.15s ease-in-out, borderColor 0.15s ease-in-out, backgroundColor 0.15s ease-in-out',

				'&:after': {
					content: '""',
					position: 'absolute',
					transform: `translate(5px, 5px) ${checked ? 'scale(1)' : 'scale(0)'}`,
					width: '12px',
					height: '12px',
					backgroundColor: disabled ? lighten(0.2, theme.color.primary) : theme.color.primary,
					borderRadius: '100%',
					transition: 'transform 0.15s ease-in-out',
				},
			})}
			{...rest}
		/>
	)
}

export default RadioCircle
