import type { ComponentPropsWithoutRef } from 'react'

export const AllGamesLink = ({ ...rest }: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			background: [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`],
			aspectRatio: '3/4',
			height: '100%',
			width: '100%',
			maxHeight: '352px',
			maxWidth: '264px',
			borderRadius: '4px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			textAlign: 'center',
			fontSize: theme.font.size.s140,
			textDecoration: 'none',
			color: theme.color.text,
		})}
		{...rest}
	/>
)
