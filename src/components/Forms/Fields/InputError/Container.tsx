import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	isVisible: boolean,
	hasFocus: boolean,
}

export const Container = ({ isVisible, hasFocus, ...rest }: Props) => (
	<div
		css={(theme) => ({
			backgroundColor: theme.color.error,
			height: `${isVisible ? '33' : '0'}px`,
			transition: 'height 135ms ease, box-shadow 135ms ease',
			width: 'calc(100% + 2px)',
			borderRadius: '4px',
			boxShadow: isVisible && hasFocus ? `0 0 0 2px ${theme.color.error}` : 'none',
			overflow: 'hidden',
			textAlign: 'left',
		})}
		{...rest}
	/>
)
