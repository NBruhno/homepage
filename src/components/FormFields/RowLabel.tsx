import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'label'> & {
	isSlim?: boolean,
}

/* eslint-disable jsx-a11y/label-has-associated-control */
export const RowLabel = ({ isSlim = false, ...rest }: Props) => (
	<label
		css={(theme) => ({
			display: 'grid',
			gridTemplateColumns: 'min-content 1fr',
			color: theme.color.text,
			fontSize: theme.font.size.s115,
			fontFamily: theme.font.family.poppins,
			fontWeight: theme.font.weight.light,
			margin: isSlim ? 0 : '0 12px 20px 0',
			position: 'relative',
		})}
		{...rest}
	/>
)
