/* eslint-disable jsx-a11y/anchor-has-content */
import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'a'> & {
	isLoading: boolean,
}

export const Container = ({ isLoading, ...rest }: Props) => (
	<a
		css={(theme) => ([
			{
				display: 'flex',
				justifyContent: 'space-between',
				columnGap: '16px',
				alignItems: 'center',
				padding: '16px 20px',
				textDecoration: 'none',
				border: `1px solid ${theme.color.border}`,
				backgroundColor: theme.color.backgroundHover,
				borderRadius: '4px',
				transition: `background-color 135ms ${theme.animation.default}, border-color 135ms ${theme.animation.default}`,
				color: theme.color.text,
			},
			isLoading ? {
				pointerEvents: 'none',
				cursor: 'auto',

			} : {
				'&:hover, &:focus, &:active': {
					backgroundColor: adjustHsl(theme.color.primaryLighter, { alpha: 0.3 }),
					borderColor: theme.color.primary,
				},
			},
		])}
		target='_blank'
		rel='noreferrer noopener'
		{...rest}
	/>
)
