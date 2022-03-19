/* eslint-disable jsx-a11y/label-has-associated-control */

import type { ComponentPropsWithoutRef } from 'react'

export const Hint = (props: ComponentPropsWithoutRef<'label'>) => (
	<label
		css={(theme) => ({
			color: theme.color.textFaded,
			flexShrink: 0,
			fontFamily: theme.font.family.roboto,
			fontSize: theme.font.size.s70,
			verticalAlign: '1.5px',
		})}
		{...props}
	/>
)
