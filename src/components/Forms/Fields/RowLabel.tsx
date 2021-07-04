import type { ComponentProps } from 'react'

/* eslint-disable jsx-a11y/label-has-associated-control */
export const RowLabel = (props: ComponentProps<'label'>) => (
	<label
		css={(theme) => ({
			display: 'grid',
			gridTemplateColumns: 'min-content 1fr',
			color: theme.color.text,
			fontSize: theme.font.size.s115,
			fontFamily: theme.font.family.poppins,
			fontWeight: theme.font.weight.light,
			margin: '0 12px 20px 0',
		})}
		{...props}
	/>
)
