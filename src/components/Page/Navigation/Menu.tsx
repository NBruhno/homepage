import { forwardRef } from 'react'
import { useSpring, animated } from 'react-spring'

type Props = {
	isOpen: boolean,
} & React.ComponentPropsWithRef<'div'>

export const Menu: React.FC<Props> = forwardRef(({ isOpen, ...rest }, ref) => (
	<animated.div
		ref={ref}
		css={(theme: Theme) => ({
			background: theme.color.inputBackground,
			position: 'absolute',
			width: '200px',
			left: 0,
			right: 0,
			zIndex: 4,
			borderRadius: '4px',
			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
			overflow: 'hidden',
		})}
		style={useSpring({
			config: {
				duration: 150,
			},
			to: async (next: any) => {
				next({ opacity: isOpen ? 1 : 0 })
				next({ height: isOpen ? 'unset' : 0, config: { delay: 150 } })
				next({ top: isOpen ? '28px' : '20px' })
			},

		})}
		{...rest}
	/>
))
