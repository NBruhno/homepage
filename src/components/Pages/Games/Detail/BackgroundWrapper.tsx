export const BackgroundWrapper = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			height: '500px',
			width: '100%',
			zIndex: 0,
			overflow: 'hidden',
			backgroundColor: theme.color.gray,

			[theme.mediaQueries.maxMobile]: {
				height: '250px',
			},
		})}
		{...props}
	/>
)
