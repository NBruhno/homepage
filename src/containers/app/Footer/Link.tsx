/* eslint-disable jsx-a11y/anchor-has-content */

type Props = {
	alt?: string,
} & React.ComponentProps<'a'>

export const LinkTitle = (props: React.ComponentProps<'span'>) => (
	<span css={{ display: 'none' }} {...props} />
)

export const Link = ({ alt, children, ...rest }: Props) => (
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
		rel='noreferrer'
		{...rest}
	>
		{children}
		<LinkTitle>{alt}</LinkTitle>
	</a>
)
