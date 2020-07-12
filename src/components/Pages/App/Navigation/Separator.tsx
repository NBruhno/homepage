type Props = {
	slim?: boolean,
} & React.ComponentProps<'div'>

export const Separator = ({ slim = false, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			borderTop: `1px solid ${theme.color.border}`,
			fontSize: theme.fontSize.s100,
			padding: slim ? '0 24px' : '12px 24px',
			color: theme.color.text,
			margin: '18px 0 2px',
		})}
		{...rest}
	/>
)
