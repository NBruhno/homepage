import type { ComponentPropsWithoutRef } from 'react'

export const Container = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			border: `1px solid ${theme.color.gray020}`,
			borderRadius: '4px',
			maxWidth: '400px',
			height: '86px',
			backgroundColor: theme.color.background,

			[theme.mediaQueries.maxDesktop]: {
				maxWidth: 'unset',
			},
		})}
		{...props}
	/>
)
