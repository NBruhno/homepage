import type { ReactNode } from 'react'

import NextLink from 'next/link'
import { styled } from 'styled-components'

type Props = {
	href: string
	isTransparent: boolean
	shouldOpenInNewTab?: boolean
	isInternal?: boolean
	children: ReactNode
	target?: string
}

export const LinkComponent = styled(NextLink)<Props>`
	color: ${({ theme, isTransparent }) => (isTransparent ? theme.color.white : theme.color.text)};
	display: flex;
	opacity: 0.7;
	transition: opacity 200ms ${({ theme }) => theme.animation.default};

	&:hover {
		opacity: 1;
	}
`

export const NativeLink = styled(LinkComponent).attrs({
	as: 'a',
})<Props>``

export const Link = ({ isTransparent, children, isInternal = false, shouldOpenInNewTab = true, ...rest }: Props) => {
	const openInNewTabProps = shouldOpenInNewTab
		? {
				target: '_blank',
				rel: 'noreferrer noopener',
			}
		: {}

	if (isInternal) {
		return (
			<LinkComponent isTransparent={isTransparent} {...rest}>
				{children}
			</LinkComponent>
		)
	}

	return (
		<NativeLink isTransparent={isTransparent} {...rest} {...openInNewTabProps}>
			{children}
		</NativeLink>
	)
}
