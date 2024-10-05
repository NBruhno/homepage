import type { ReactNode } from 'react'

import { css } from '@emotion/react'
import NextLink from 'next/link'

type Props = {
	href: string,
	isTransparent: boolean,
	shouldOpenInNewTab?: boolean,
	isInternal?: boolean,
	children: ReactNode,
	target?: string,
}

export const Link = ({ isTransparent, children, isInternal = false, shouldOpenInNewTab = true, ...rest }: Props) => {
	const openInNewTabProps = shouldOpenInNewTab ? {
		target: '_blank',
		rel: 'noreferrer noopener',
	} : {}

	const styling = ({ theme }: { theme: Theme }) => css({
		color: isTransparent ? theme.color.white : theme.color.text,
		display: 'flex',
		opacity: 0.7,
		transition: `opacity 200ms ${theme.animation.default}`,

		'&:hover': {
			opacity: 1,
		},
	})

	if (isInternal) {
		return (
			<NextLink
				css={(theme) => styling({ theme })}
				{...rest}
			>
				{children}
			</NextLink>
		)
	}

	return (
		<a
			css={(theme) => styling({ theme })}
			{...openInNewTabProps}
			{...rest}
		>
			{children}
		</a>
	)
}
