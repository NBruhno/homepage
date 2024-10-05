/* eslint-disable jsx-a11y/anchor-has-content */
import type { ComponentPropsWithoutRef } from 'react'

export const SteamItem = (props: ComponentPropsWithoutRef<'a'>) => (
	<a
		css={(theme) => ({
			marginTop: '10px',
			overflow: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			columnGap: '8px',
			color: theme.color.text,
			fontFamily: theme.font.family.poppins,
			textDecoration: 'none',
		})}
		target='_blank'
		rel='noreferrer noopener'
		aria-label='Steam reviews'
		{...props}
	/>
)
