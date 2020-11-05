export const Subtitle = (props: React.ComponentProps<'p'>) => (
	<p
		css={(theme: Theme) => ({
			color: theme.color.gray050,
			marginTop: '36px',
			textAlign: 'center',
		})}
		{...props}
	/>
)
