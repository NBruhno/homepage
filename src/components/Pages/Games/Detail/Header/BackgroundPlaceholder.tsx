export const BackgroundPlaceholder = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: theme.color.gray,
			height: '100%',
			objectFit: 'cover',
			width: '100%',
		})}
		{...props}
	/>
)
