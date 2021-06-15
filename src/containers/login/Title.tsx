/* eslint-disable jsx-a11y/heading-has-content */
import type { ComponentProps } from 'react'

export const Title = (props: ComponentProps<'h2'>) => (
	<h2
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s140,
			textAlign: 'center',
			margin: '12px 0 8px',
		})}
		{...props}
	/>
)
