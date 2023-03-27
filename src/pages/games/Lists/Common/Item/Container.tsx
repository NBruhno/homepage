import type { ComponentPropsWithRef, Ref } from 'react'

import NextLink from 'next/link'
import { forwardRef } from 'react'

type Props = ComponentPropsWithRef<typeof NextLink> & {
	isLoading?: boolean,
}

const Component = ({ isLoading, ...rest }: Props, ref: Ref<HTMLAnchorElement>) => (
	<NextLink
		css={(theme) => ([{
			backgroundColor: theme.color.background,
			border: `1px solid ${theme.color.gray020}`,
			borderRadius: '4px',
			color: theme.color.text,
			cursor: 'pointer',
			display: 'grid',
			gridTemplateRows: '1fr',
			gridTemplateColumns: '120px fit-content(580px)',
			marginBottom: '12px',
			overflow: 'hidden',
			textDecoration: 'none',
			height: '168px',
			transition: `
				border 200ms ${theme.animation.default},
				box-shadow 200ms ${theme.animation.default},
				background 200ms ${theme.animation.default}`,
		}, !isLoading ? {
			'&:hover': {
				border: `1px solid ${theme.color.primaryLighter}`,
				// backgroundColor: theme.color.backgroundHover,
				background: [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`],
				boxShadow: `${theme.isDarkTheme ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'} 0px 3px 10px 0px`,
			},

			'&:active': {
				border: `1px solid ${theme.color.primary}`,
				boxShadow: `rgba(0, 0, 0, 0.3) 0px 3px 10px 0px, 0 0 0 1px ${theme.color.primary}`,
			},
		} : null])}
		{...rest}
		ref={ref}
	/>
)

export const Container = forwardRef(Component)
