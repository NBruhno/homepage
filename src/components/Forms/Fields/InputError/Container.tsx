import type { ComponentProps } from 'react'

type Props = {
	isVisible: boolean,
	isFocus: boolean,
} & ComponentProps<'div'>

export const Container = ({ isVisible, isFocus, ...rest }: Props) => (
	<div
		css={(theme) => ({
			backgroundColor: theme.color.error,
			height: `${isVisible ? '33' : '0'}px`,
			transition: 'height 0.3s ease, box-shadow 0.3s ease',
			width: 'calc(100% + 2px)',
			borderRadius: '4px',
			boxShadow: isVisible && isFocus ? `0 0 0 1px ${theme.color.error}` : 'none',
			overflow: 'hidden',
		})}
		{...rest}
	/>
)
