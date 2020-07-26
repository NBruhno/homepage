export const Text = (props: React.ComponentProps<'span'>) => (
	<span
		css={(theme: Theme) => ({
			color: theme.color.white,
			fontSize: theme.fontSize.s80,
			marginLeft: '5px',
			verticalAlign: '5px',
		})}
		{...props}
	/>
)
