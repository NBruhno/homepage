import { transparentize } from 'polished'

type Props = {
	show?: boolean,
} & React.ComponentProps<'div'>

export const GuardShade = ({ show, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: show ? transparentize(0.5, theme.color.background) : 'none',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 4,
			pointerEvents: show ? 'auto' : 'none',
			transition: `background-color 135ms ${theme.animation.default}`,

			'@supports ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px)))': {
				backdropFilter: show ? 'blur(5px) opacity(0.7)' : 'none',
				backgroundColor: show ? transparentize(1, theme.color.background) : 'none',
			},
		})}
		{...rest}
	/>
)
