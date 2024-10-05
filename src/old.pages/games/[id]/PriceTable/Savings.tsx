import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	difference: number,
}

export const Savings = ({ difference, ...rest }: Props) => (
	<div
		css={(theme) => ({
			color: difference === 0 ? theme.color.textSubtitle : theme.color.success,
			fontSize: theme.font.size.s80,
			textAlign: 'right',
			lineHeight: 1,
		})}
		{...rest}
	>
		{difference === 0 ? (
			'Retail'
		) : (
			`${difference}% off`
		)}
	</div>
)
