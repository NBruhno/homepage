/* eslint-disable jsx-a11y/heading-has-content */

export const Title = (props: React.ComponentProps<'h2'>) => (
	<h2
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s140,
			textAlign: 'center',
			margin: '12px 0 8px',
		})}
		{...props}
	/>
)
