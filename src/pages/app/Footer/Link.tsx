import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'a'> & {
	isTransparent: boolean,
	shouldOpenInNewTab?: boolean,
}

export const Link = ({ isTransparent, children, shouldOpenInNewTab = true, ...rest }: Props) => {
	const openInNewTabProps = shouldOpenInNewTab ? {
		target: '_blank',
		rel: 'noreferrer noopener',
	} : {}

	return (
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
			{...openInNewTabProps}
			{...rest}
		>
			{children}
		</a>
	)
}
