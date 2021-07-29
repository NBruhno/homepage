import type { ComponentProps } from 'react'

export const Link = ({ children, ...rest }: ComponentProps<'a'>) => (
	<a
		css={(theme) => ({
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
