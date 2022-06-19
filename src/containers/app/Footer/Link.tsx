import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'a'> & {
	isTransparent: boolean,
}

export const Link = ({ isTransparent, children, ...rest }: Props) => (
	<a
		css={(theme) => ({
			color: isTransparent ? theme.color.white : theme.color.text,
			display: 'flex',
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
