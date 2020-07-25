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
			transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1)',

			[theme.mediaQueries.maxMobile]: {
				height: '250px',
			},
		})}
		{...props}
	/>
)
