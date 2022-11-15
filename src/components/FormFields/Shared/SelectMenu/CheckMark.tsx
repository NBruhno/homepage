import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	isChecked: boolean,
	isDisabled: boolean,
}

export const CheckMark = ({ isChecked, isDisabled, ...rest }: Props) => (
	<div
		css={(theme) => ({
			position: 'relative',
			width: '20px',
			height: '20px',
			flexShrink: 0,
			outline: 0,
			margin: 'auto',
			backgroundColor: isDisabled ? theme.color.gray : theme.color.primary,
			opacity: isChecked ? 1 : 0,
			borderRadius: '100%',

			'&:after': {
				content: '""',
				position: 'absolute',
				left: '7px',
				top: '3px',
				width: '4px',
				height: '9px',
				borderStyle: 'solid',
				borderColor: theme.color.background,
				borderWidth: '0 2px 2px 0',
				transform: 'rotate(37deg)',
				transition: `opacity 135ms ${theme.animation.default}`,
			},
		})}
		{...rest}
	/>
)
