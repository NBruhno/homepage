import { adjustHsl } from 'lib/adjustHsl'

type Props = {
	isChecked?: boolean,
	isDisabled?: boolean,
	hasFocus?: boolean | undefined,
}

export const ToggleComponent = ({ isChecked, isDisabled, hasFocus }: Props) => {
	const backgroundColor = (theme: Theme) => {
		if (isDisabled) {
			return isChecked ? theme.color.primaryLight : adjustHsl(theme.color.gray, { light: '34%' })
		} else {
			return isChecked ? theme.color.primary : theme.color.gray
		}
	}

	const boxShadow = (theme: Theme) => {
		if (isChecked) {
			return hasFocus ? `0 0 0 2px ${theme.color.primary}` : 'none'
		} else {
			return hasFocus ? `0 0 0 1px ${theme.color.gray}` : 'none'
		}
	}

	return (
		<div
			css={(theme) => ({
				position: 'relative',
				borderRadius: '22px',
				width: '40px',
				height: '22px',
				backgroundColor: backgroundColor(theme),
				boxShadow: boxShadow(theme),
				outline: 0,
				flexShrink: 0,
				margin: 'auto',
				cursor: isDisabled ? 'auto' : 'pointer',

				transition: 'boxShadow 0.15s ease-in-out, background-color 0.15s ease-in-out',

				'&:before': {
					position: 'absolute',
					content: '""',
					height: '18px',
					width: '18px',
					left: '2px',
					bottom: '2px',
					backgroundColor: isDisabled ? theme.color.grayLighter : theme.color.white,
					transition: 'transform 0.15s',
					borderRadius: '50px',
					transform: isChecked ? 'translateX(18px)' : 'translateX(0)',
				},
			})}
		/>
	)
}
