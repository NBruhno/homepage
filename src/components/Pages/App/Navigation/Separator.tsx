type Props = {
	slim?: boolean,
	collapsed?: boolean,
} & React.ComponentProps<'div'>

export const Separator = ({ slim = false, collapsed = false, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			borderTop: `1px solid ${theme.color.border}`,
			fontSize: theme.fontSize.s100,
			padding: slim ? '0 24px' : '12px 24px',
			height: (slim || collapsed) ? '0px' : '26px',
			transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
			color: theme.color.text,
			margin: slim ? 0 : '18px 0 2px',
		})}
		{...rest}
	/>
)
