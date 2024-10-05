import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	isNebulaVisible: boolean,
}

export const Grid = ({ isNebulaVisible, ...rest }: Props) => (
	<div
		css={(theme) => ({
			backgroundColor: isNebulaVisible ? 'transparent' : theme.color.background,
			display: 'grid',
			gridTemplateColumns: 'auto 1fr',
			gridTemplateRows: '1fr',
			maxWidth: '100vw',
			minHeight: '100vh',
			position: 'relative',

			[theme.mediaQueries.maxMobile]: {
				gridTemplateColumns: '1fr',
				gridTemplateRows: 'auto 1fr',
			},
		})}
		{...rest}
	/>
)
