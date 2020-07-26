import { transparentize } from 'polished'

export const Container = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: transparentize(0.5, theme.color.background),
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 4,

			'@supports ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px)))': {
				backdropFilter: 'saturate(150%) blur(5px) opacity(0.7)',
				backgroundColor: transparentize(1, theme.color.background),
			},
		})}
		{...props}
	/>
)
