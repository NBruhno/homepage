import type { ComponentProps } from 'react'

export const Container = (props: ComponentProps<'div'>) => (
	<div
		css={(theme) => ({
			border: `1px solid ${theme.color.gray020}`,
			borderRadius: '4px',
			marginTop: '12px',
			maxWidth: '400px',

			[theme.mediaQueries.maxTablet]: {
				maxWidth: 'unset',
			},
		})}
		{...props}
	/>
)
