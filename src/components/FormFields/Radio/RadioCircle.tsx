import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'div'> & {
	hasFocus: boolean,
	hasError: boolean,
	isChecked: boolean,
	isDisabled: boolean,
}

export const RadioCircle = ({ hasFocus, hasError, isChecked, isDisabled, ...rest }: Props) => {
	const boxShadow = (theme: Theme) => {
		if (hasFocus) {
			return hasError ? `0 0 0 2px ${theme.color.error}` : `0 0 0 2px ${adjustHsl(theme.color.primary, { alpha: 0.8 })}`
		} else {
			return 'none'
		}
	}

	const border = (theme: Theme) => {
		if (isDisabled && isChecked) {
			return adjustHsl(theme.color.primary, { light: '60%' })
		} else if (isChecked || hasFocus) {
			return theme.color.primary
		} else if (hasError) {
			return theme.color.error
		} else {
			return theme.color.gray
		}
	}

	const backgroundColor = (theme: Theme) => {
		if (isDisabled) {
			return hasError ? adjustHsl(theme.color.error, { light: '60%' }) : theme.color.grayLight
		} else {
			return hasError ? adjustHsl(theme.color.error, { light: '60%' }) : theme.color.white
		}
	}

	// const borderColor = (theme) => {
	// 	if (isDisabled || hasError) {
	// 		return 'initial'
	// 	}	else if (isChecked && hasFocus) {
	// 		return 'transparent'
	// 	} else {
	// 		return theme.color.primary
	// 	}
	// }

	return (
		<div
			css={(theme) => ({
				cursor: isDisabled ? 'auto' : 'pointer',
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
					transform: `translate(5px, 5px) ${isChecked ? 'scale(1)' : 'scale(0)'}`,
					width: '12px',
					height: '12px',
					backgroundColor: isDisabled ? adjustHsl(theme.color.primary, { light: '60%' }) : theme.color.primary,
					borderRadius: '100%',
					transition: 'transform 0.15s ease-in-out',
				},
			})}
			{...rest}
		/>
	)
}

export default RadioCircle
