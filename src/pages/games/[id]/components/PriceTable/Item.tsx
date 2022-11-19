/* eslint-disable jsx-a11y/anchor-has-content */

import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'a'> & {
	isFirst?: boolean,
}

export const Item = ({ isFirst, ...rest }: Props) => (
	<a
		css={(theme) => ({
			backgroundColor: 'transparent',
			borderTopLeftRadius: '4px',
			borderTopRightRadius: '4px',
			borderBottomLeftRadius: isFirst ? 0 : '4px',
			borderBottomRightRadius: isFirst ? 0 : '4px',
			color: theme.color.text,
			display: 'flex',
			fontFamily: theme.font.family.poppins,
			alignItems: 'center',
			justifyContent: 'space-between',
			margin: 0,
			padding: isFirst ? '12px 10px' : '6px 10px',
			textDecoration: 'none',
			transition: `background-color 135ms ${theme.animation.default}`,

			'&:hover, &:focus, &:active': {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.3 }),
				borderColor: theme.color.primary,
			},
		})}
		target='_blank'
		rel='noreferrer noopener'
		{...rest}
	/>
)
