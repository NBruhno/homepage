import type { MouseEvent } from 'react'
import type { Promisable } from 'type-fest'

import { css, keyframes } from '@emotion/react'
import { IconLoader2 } from '@tabler/icons'

import { adjustHsl } from 'lib/client'

type Props = {
	isChecked?: boolean,
	isDisabled?: boolean,
	isLoading?: boolean,
	hasFocus?: boolean | undefined,
	onClick?: (event: MouseEvent<HTMLButtonElement>) => Promisable<any>,
	label?: string,
}

export const ToggleComponent = ({ isChecked, isDisabled, isLoading, hasFocus, onClick, label }: Props) => {
	const backgroundColor = (theme: Theme) => {
		if (isDisabled || isLoading) return isChecked ? theme.color.primaryLight : adjustHsl(theme.color.gray, { light: '34%' })
		else return isChecked ? theme.color.primary : theme.color.gray
	}

	const boxShadow = (theme: Theme) => {
		if (isChecked) return hasFocus ? `0 0 0 2px ${theme.color.primary}` : 'none'
		else return hasFocus ? `0 0 0 1px ${theme.color.gray}` : 'none'
	}

	const transform = () => {
		if (isLoading) return 'translateX(9px)'
		else if (isChecked) return 'translateX(18px)'
		else return 'translateX(0)'
	}

	const transformSpinner = () => {
		if (isLoading) return 'translateX(0px)'
		else if (isChecked) return 'translateX(9px)'
		else return 'translateX(-9px)'
	}

	const styling = (theme: Theme) => css({
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
			transform: transform(),
		},
	})

	if (onClick) {
		const animation = keyframes`
			0% {
				transform: rotate(0deg),
			}
			1000% {
				transform: rotate(359deg),
			}
		`

		return (
			<button
				aria-label={label}
				type='button'
				onClick={onClick}
				css={(theme) => [
					styling(theme),
					{
						border: 'none',
					},
				]}
			>
				<IconLoader2
					css={(theme) => ({
						color: theme.color.gray060,
						// opacity: isLoading ? 1 : 0,
						marginTop: '2px',
						transition: 'transform 0.15s, opacity 0.15s',
						transform: transformSpinner(),
						animation: `${animation} 2.2s linear infinite`,
					})}
					size={16}
					strokeWidth={3}
				/>
			</button>
		)
	}

	return (
		<div css={(theme) => styling(theme)} />
	)
}
