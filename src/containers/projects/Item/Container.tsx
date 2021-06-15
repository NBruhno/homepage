/* eslint-disable jsx-a11y/anchor-has-content */
import type { ComponentPropsWithRef, LegacyRef } from 'react'

import { forwardRef } from 'react'

const Component = (props: ComponentPropsWithRef<'a'>, ref: LegacyRef<HTMLAnchorElement>) => (
	<a
		css={(theme: Theme) => ({
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
			transition: `
					border 200ms ${theme.animation.default},
					box-shadow 200ms ${theme.animation.default}`,
			transform: 'none',

			'&:hover': {
				border: `1px solid ${theme.color.primaryLighter}`,
				boxShadow: `${theme.darkTheme ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'} 0px 3px 10px 0px`,
			},

			'&:active': {
				border: `1px solid ${theme.color.primary}`,
				boxShadow: `rgba(0, 0, 0, 0.3) 0px 3px 10px 0px, 0 0 0 1px ${theme.color.primary}`,
			},
		})}
		{...props}
		ref={ref}
	/>
)

export const Container = forwardRef(Component)
