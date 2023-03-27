import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	isChecked: boolean,
	isDisabled: boolean,
	isFocusVisible: boolean,
	isHovered: boolean,
}

export const CheckMark = ({ isChecked, isDisabled, isFocusVisible, isHovered, ...rest }: Props) => (
	<div
		css={(theme) => [
			{
				cursor: isDisabled ? 'auto' : 'pointer',
				position: 'relative',
				border: '1px solid',
				borderRadius: '4px',
				width: '22px',
				height: '22px',
				backgroundColor: (() => {
					if (isHovered && isChecked && !isDisabled) return theme.color.primaryLighter
					if (isDisabled) return isChecked ? theme.color.gray : theme.color.background
					return isChecked ? theme.color.primary : theme.color.white
				})(),
				outline: 0,
				flexShrink: 0,
				margin: 'auto',
				borderColor: (() => {
					if (isHovered && !isDisabled) return isChecked ? theme.color.primaryLighter : theme.color.primary
					if (isDisabled) return isChecked ? theme.color.grayLight : theme.color.gray
					return isChecked ? theme.color.primary : theme.color.gray
				})(),

				transition: 'box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out, background-color 0.15s ease-in-out',

				'&:after': {
					cursor: isDisabled ? 'auto' : 'pointer',
					content: '""',
					position: 'absolute',
					left: '7px',
					top: '2px',
					width: '6px',
					height: '14px',
					borderStyle: 'solid',
					borderColor: theme.isDarkTheme ? theme.color.gray100 : theme.color.gray080,
					borderWidth: isChecked ? '0 2px 2px 0' : 0,
					transform: 'rotate(37deg)',
					transition: 'border-width 0.15s ease-in-out',
				},
			},
			isFocusVisible && {
				outline: `${theme.color.focusOutline} solid 2px`,
				outlineOffset: '2px',
			},
		]}
		{...rest}
	/>
)
