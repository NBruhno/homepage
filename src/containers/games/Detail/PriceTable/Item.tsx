/* eslint-disable jsx-a11y/anchor-has-content */

import type { ComponentProps } from 'react'

type Props = ComponentProps<'a'> & {
	isFirst?: boolean,
}

export const Item = ({ isFirst, ...rest }: Props) => (
	<a
		css={(theme) => ({
			backgroundColor: theme.color.background,
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

			'&:hover': {
				backgroundColor: theme.color.gray020,
			},
		})}
		target='_blank'
		rel='noreferrer noopener'
		{...rest}
	/>
)
