export const Link = ({ children, ...rest }: React.ComponentProps<'a'>) => (
	<a
		css={(theme: Theme) => ({
			display: 'flex',
			color: theme.color.text,
			opacity: 0.7,
			transition: `opacity 200ms ${theme.animation.default}`,

			'&:hover': {
				opacity: 1,
			},
		})}
		target='_blank'
		rel='noreferrer noopener'
		{...rest}
	>
		{children}
	</a>
)
