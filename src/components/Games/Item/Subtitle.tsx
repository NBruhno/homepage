export const Subtitle = (props: React.ComponentProps<'span'>) => (
	<span
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.base,
		})}
		{...props}
	/>
)
