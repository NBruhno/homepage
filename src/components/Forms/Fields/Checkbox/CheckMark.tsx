import type { ComponentProps } from 'react'

type Props = {
	checked: boolean,
	disabled: boolean,
	focus: boolean,
} & ComponentProps<'div'>

export const CheckMark = ({ checked, disabled, focus, ...rest }: Props) => {
	const backgroundColor = (theme: Theme) => {
		if (disabled) {
			return checked ? theme.color.gray : theme.color.background
		} else {
			return checked ? theme.color.primary : theme.color.white
		}
	}

	return (
		<div
			css={(theme: Theme) => ({
				cursor: disabled ? 'auto' : 'pointer',
				position: 'relative',
				boxShadow: focus ? `0 0 0 2px ${theme.color.primary}` : 'none',
				border: `1px solid ${checked ? theme.color.primary : theme.color.gray}`,
				borderRadius: '4px',
				width: '22px',
				height: '22px',
				backgroundColor: backgroundColor(theme),
				outline: 0,
				flexShrink: 0,
				margin: 'auto',

				transition: 'box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out, background-color 0.15s ease-in-out',

				'&:after': {
					content: '""',
					position: 'absolute',
					left: '7px',
					top: '2px',
					width: '6px',
					height: '14px',
					borderStyle: 'solid',
					borderColor: theme.color.text,
					borderWidth: checked ? '0 2px 2px 0' : 0,
					transform: 'rotate(37deg)',
					transition: 'border-width 0.15s ease-in-out',
				},

				'&:hover': {
					borderColor: disabled ? undefined : theme.color.primary,
				},
			})}
			{...rest}
		/>
	)
}
