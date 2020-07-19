export const BackgroundPlaceholder = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			width: '100%',
			height: '100%',
			backgroundColor: theme.color.gray,
			objectFit: 'cover',
		})}
		{...props}
	/>
)
