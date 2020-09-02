/* eslint-disable jsx-a11y/anchor-has-content */

export const Link = (props: React.ComponentProps<'a'>) => (
	<a
		css={(theme: Theme) => ({
			display: 'flex',
			color: theme.color.text,
			opacity: 0.7,

			'&:hover': {
				opacity: 1,
			},
		})}
		{...props}
	/>
)
