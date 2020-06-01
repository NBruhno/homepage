import { lighten } from 'polished'

export type Props = {
	checked?: boolean,
	disabled?: boolean,
	focus?: boolean,
}

export const Toggle = ({ checked, disabled, focus }: Props) => {
	const backgroundColor = (theme: Theme) => {
		if (disabled) {
			return checked ? theme.color.primaryLight : lighten(0.075, theme.color.gray)
		} else {
			return checked ? theme.color.primary : theme.color.gray
		}
	}

	const boxShadow = (theme: Theme) => {
		if (checked) {
			return focus ? `0 0 0 2px ${theme.color.primary}` : 'none'
		} else {
			return focus ? `0 0 0 1px ${theme.color.gray}` : 'none'
		}
	}

	return (
		<div
			css={(theme: Theme) => ({
				position: 'relative',
				borderRadius: '22px',
				width: '40px',
				height: '22px',
				backgroundColor: backgroundColor(theme),
				boxShadow: boxShadow(theme),
				outline: 0,
				flexShrink: 0,
				margin: '1px 7px 1px 0',
				cursor: disabled ? 'auto' : 'pointer',

				transition: 'boxShadow 0.15s ease-in-out, background-color 0.15s ease-in-out',

				'&:before': {
					position: 'absolute',
					content: '""',
					height: '18px',
					width: '18px',
					left: '2px',
					bottom: '2px',
					backgroundColor: disabled ? theme.color.grayLighter : theme.color.white,
					transition: 'transform 0.15s',
					borderRadius: '50px',
					transform: checked ? 'translateX(18px)' : 'translateX(0)',
				},
			})}
		/>
	)
}
