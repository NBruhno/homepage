import type { MouseEvent } from 'react'
import type { Promisable } from 'type-fest'

import { css } from '@emotion/react'

import { adjustHsl } from 'lib/client'

import { Spinner } from 'components/Spinner'

type Props = {
	isChecked: boolean,
	isDisabled: boolean,
	isFocusVisible: boolean,
	isHovered: boolean,
	isLoading?: boolean,
	onClick?: (event: MouseEvent<HTMLButtonElement>) => Promisable<any>,
	label: string,
}

export const ToggleComponent = ({ isChecked, isDisabled, isLoading, isFocusVisible, isHovered, onClick, label }: Props) => {
	const backgroundColor = (theme: Theme) => {
		if (isHovered && !isLoading && !isDisabled) return isChecked ? theme.color.primaryLighter : theme.color.grayLight
		if (isDisabled || isLoading) return isChecked ? theme.color.primaryLight : adjustHsl(theme.color.gray, { light: '34%' })
		else return isChecked ? theme.color.primary : theme.color.gray
	}

	const boxShadow = (theme: Theme) => {
		if (isChecked) return isFocusVisible ? `0 0 0 2px ${theme.color.primary}` : 'none'
		else return isFocusVisible ? `0 0 0 1px ${theme.color.gray}` : 'none'
	}

	const transform = () => {
		if (isLoading) return 'translateX(9px)'
		else if (isChecked) return 'translateX(18px)'
		else return 'translateX(0)'
	}

	const marginSpinner = () => {
		if (isLoading) return '2px 0 0'
		else if (isChecked) return '2px -18px 0 0'
		else return '2px 0 0 -18px'
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
		cursor: (isDisabled || isLoading) ? 'auto' : 'pointer',

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
		return (
			<button
				aria-label={label}
				type='button'
				onClick={(event) => {
					if (isDisabled || isLoading) return undefined
					else onClick(event)
				}}
				css={(theme) => [
					styling(theme),
					{
						border: 'none',
					},
				]}
			>
				<Spinner
					css={{
						opacity: isLoading ? 1 : 0,
						transition: 'margin 0.15s, opacity 0.15s',
						margin: marginSpinner(),
						position: 'relative',
					}}
					size={16}
				/>
			</button>
		)
	}

	return (
		<div css={(theme) => styling(theme)} />
	)
}
