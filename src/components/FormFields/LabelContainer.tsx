import type { ComponentPropsWithoutRef } from 'react'

export const LabelContainer = (props: ComponentPropsWithoutRef<'label'>) => (
	// eslint-disable-next-line jsx-a11y/label-has-associated-control
	<label
		css={(theme) => ({
			color: theme.color.textFaded,
			display: 'flex',
			flexDirection: 'column',
			fontSize: theme.font.size.s100,
			fontWeight: theme.font.weight.regular,
			textAlign: 'left',
			marginBottom: 0,
		})}
		{...props}
	/>
)
