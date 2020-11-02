export const Muted = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			color: theme.color.gray050,
			fontSize: theme.fontSize.s90,
			padding: '10px 0',

			[theme.mediaQueries.maxTablet]: {
				textAlign: 'center',
				padding: '0 10px',
			},
		})}
		{...props}
	/>
)
