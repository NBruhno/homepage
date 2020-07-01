export const MenuItem = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: theme.color.inputBackground,
			color: theme.color.text,
			fontWeight: 'normal',
			padding: '12px',
			transition: 'all 0.3s ease',
			cursor: 'pointer',

			'&:hover': {
				backgroundColor: theme.color.inputBackgroundHover,
			},

			'&:last-of-type': {
				borderBottomLeftRadius: '4px',
				borderBottomRightRadius: '4px',
			},

			'&:first-of-type': {
				borderTopLeftRadius: '4px',
				borderTopRightRadius: '4px',
			},
		})}
		{...props}
	/>
)
