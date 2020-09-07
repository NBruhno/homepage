/* eslint-disable jsx-a11y/heading-has-content */
export const Title = (props: React.ComponentProps<'h1'>) => (
	<h1
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s200,
			margin: 0,
		})}
		{...props}
	/>
)
