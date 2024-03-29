/* eslint-disable jsx-a11y/heading-has-content */
import type { ComponentPropsWithoutRef } from 'react'

export const Title = (props: ComponentPropsWithoutRef<'h2'>) => (
	<h2
		css={(theme) => ({
			fontSize: theme.font.size.s140,
			textAlign: 'center',
			margin: '12px 0 8px',
		})}
		{...props}
	/>
)
