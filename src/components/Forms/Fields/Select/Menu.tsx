import { forwardRef } from 'react'
import { useSpring, animated } from 'react-spring'

type Props = {
	isOpen: boolean,
	hasError: boolean,
} & React.ComponentPropsWithRef<'div'>

export const Menu: React.FC<Props> = forwardRef(({ isOpen, hasError, ...rest }, ref) => (
	<animated.div
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
		})}
		style={useSpring({
			config: {
				duration: 100,
			},
			opacity: isOpen ? 1 : 0,
			height: isOpen ? 'unset' : 0,
			top: isOpen ? '48px' : '42px',
		})}
		{...rest}
	/>
))
