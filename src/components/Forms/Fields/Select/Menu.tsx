import { forwardRef } from 'react'

type Props = {
	isOpen: boolean,
	hasError: boolean,
} & React.ComponentPropsWithRef<'div'>

export const Menu: React.FC<Props> = forwardRef(({ isOpen, hasError, ...rest }, ref) => (
	<div
		ref={ref}
		css={(theme: Theme) => ({
			background: theme.color.inputBackground,
			position: 'absolute',
			width: '100%',
			left: 0,
			right: 0,
			zIndex: 4,
			borderRadius: '4px',
			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
			overflow: 'hidden',
			visibility: isOpen ? 'visible' : 'hidden',
			height: isOpen ? 'unset' : 0,
			opacity: isOpen ? 1 : 0,
			top: isOpen ? '48px' : '42px',
			transition: `height 500ms ${theme.animation.default}, opacity 200ms ${theme.animation.default}, top 200ms ${theme.animation.default}`,
		})}
		{...rest}
	/>
))
