export const MainContent = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			padding: '272px 20% 0',
			zIndex: 1,
			display: 'flex',
			textShadow: '1px 1px 5px black, 0 0 1em black',
			width: '100%',

			[theme.mediaQueries.maxMobile]: {
				padding: '92px auto 0',
			},
		})}
		{...props}
	/>
)
