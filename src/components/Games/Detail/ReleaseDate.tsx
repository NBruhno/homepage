/* eslint-disable jsx-a11y/heading-has-content */
export const ReleaseDate = (props: React.ComponentProps<'h1'>) => (
	<h1
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s140,
		})}
		{...props}
	/>
)
