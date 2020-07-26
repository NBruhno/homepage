type Props = {
	slim?: boolean,
	collapsed?: boolean,
} & React.ComponentProps<'div'>

export const Separator = ({ slim = false, collapsed = false, ...rest }: Props) => {
	const padding = () => {
		if (slim) return '0 24px'
		if (collapsed) return '4px 24px 12px'
		return '12px 24px'
	}

	return (
		<div
			css={(theme: Theme) => ({
				borderTop: `1px solid ${theme.color.border}`,
				color: collapsed ? theme.color.background : theme.color.text,
				fontFamily: theme.fontFamily.poppins,
				fontSize: theme.fontSize.s100,
				height: (slim || collapsed) ? '0px' : '26px',
				margin: slim ? 0 : '18px 0 2px',
				minHeight: (slim || collapsed) ? '0px' : '26px',
				overflow: 'hidden',
				padding: padding(),
				textOverflow: 'ellipsis',
				transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms cubic-bezier(0.4, 0, 0.2, 1), padding 300ms cubic-bezier(0.4, 0, 0.2, 1), min-height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
				whiteSpace: 'nowrap',
			})}
			{...rest}
		/>
	)
}
