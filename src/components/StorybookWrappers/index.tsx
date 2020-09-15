export const PreviewWrapper = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: theme.color.background,
			margin: '-30px -20px',
			padding: '30px 20px',
			borderRadius: '4px',

			'#root > &': {
				margin: 0,
			},
		})}
		{...props}
	/>
)

export const StoryWrapper = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: theme.color.background,
			padding: '16px',
			borderRadius: '4px',

			'#root > &': {
				padding: '30px 20px',
				border: 'none',
				boxShadow: 'none',
				borderRadius: 'none',
			},
		})}
		{...props}
	/>
)
