export const Subtitle = (props: React.ComponentProps<'p'>) => (
	<p
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s90,
			opacity: 0.6,
			lineHeight: 1.3,
			margin: '8px 0 0',
		})}
		{...props}
	/>
)
