export const Subtitle = (props: React.ComponentProps<'p'>) => (
	<p
		css={(theme: Theme) => ({
			color: theme.color.text,
			opacity: 0.6,
			marginTop: '36px',
			textAlign: 'center',
		})}
		{...props}
	/>
)
