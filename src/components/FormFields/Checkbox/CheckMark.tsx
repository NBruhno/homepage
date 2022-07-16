import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	isChecked: boolean,
	isDisabled: boolean,
	hasFocus: boolean,
}

export const CheckMark = ({ isChecked, isDisabled, hasFocus, ...rest }: Props) => {
	const backgroundColor = (theme: Theme) => {
		if (isDisabled) {
			return isChecked ? theme.color.gray : theme.color.background
		} else {
			return isChecked ? theme.color.primary : theme.color.white
		}
	}

	return (
		<div
			css={(theme) => ({
				cursor: isDisabled ? 'auto' : 'pointer',
				position: 'relative',
				boxShadow: hasFocus ? `0 0 0 2px ${theme.color.primary}` : 'none',
				border: `1px solid ${isChecked ? theme.color.primary : theme.color.gray}`,
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
					borderWidth: isChecked ? '0 2px 2px 0' : 0,
					transform: 'rotate(37deg)',
					transition: 'border-width 0.15s ease-in-out',
				},

				'&:hover': {
					borderColor: isDisabled ? 'transparent' : theme.color.primary,
				},
			})}
			{...rest}
		/>
	)
}
