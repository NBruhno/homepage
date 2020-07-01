/* eslint-disable jsx-a11y/heading-has-content */
export const Developer = (props: React.ComponentProps<'h1'>) => (
	<h1
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s115,
		})}
		{...props}
	/>
)
