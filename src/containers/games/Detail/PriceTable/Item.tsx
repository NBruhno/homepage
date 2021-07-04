/* eslint-disable jsx-a11y/anchor-has-content */

import type { ComponentProps } from 'react'

type Props = {
	first?: boolean,
} & ComponentProps<'a'>

export const Item = ({ first, ...rest }: Props) => (
	<a
		css={(theme) => ({
			backgroundColor: theme.color.background,
			borderTopLeftRadius: first ? '4px' : 0,
			borderTopRightRadius: first ? '4px' : 0,
			color: theme.color.text,
			display: 'flex',
			fontFamily: theme.fontFamily.poppins,
			justifyContent: 'space-between',
			margin: 0,
			padding: first ? '12px 10px' : '6px 10px',
			textDecoration: 'none',
			transition: `background-color 135ms ${theme.animation.default}`,

			'&:hover': {
				backgroundColor: theme.color.gray020,
			},
		})}
		target='_blank'
		rel='noreferrer noopener'
		{...rest}
	/>
)
