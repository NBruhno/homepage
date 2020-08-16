/* eslint-disable jsx-a11y/anchor-has-content */

export const Link = (props: React.ComponentProps<'a'>) => (
	<a
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s90,
			color: theme.color.text,
			textDecoration: 'none',
			opacity: 0.7,
			display: 'inline flow-root',

			'&:hover': {
				opacity: 1,
			},
		})}
		{...props}
	/>
)
