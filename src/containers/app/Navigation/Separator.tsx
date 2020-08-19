type Props = {
	slim?: boolean,
	collapsed?: boolean,
} & React.ComponentProps<'div'>

export const Separator = ({ slim = false, collapsed = false, children, ...rest }: Props) => {
	const padding = () => {
		if (slim) return '0 24px'
		if (collapsed) return '4px 24px 12px'
		return '12px 24px'
	}

	return (
		<div
			css={(theme: Theme) => ({
				borderTop: `1px solid ${theme.color.border}`,
				color: theme.color.text,
				fontFamily: theme.fontFamily.poppins,
				fontSize: theme.fontSize.s100,
				height: ((slim || collapsed)) ? '0px' : '26px',
				margin: slim ? 0 : '18px 0 2px',
				minHeight: ((slim || collapsed)) ? '0px' : '26px',
				overflow: 'hidden',
				padding: padding(),
				textOverflow: 'ellipsis',
				transition: `height 300ms ${theme.animation.default}, padding 300ms ${theme.animation.default}, min-height 300ms ${theme.animation.default}`,
				whiteSpace: 'nowrap',

				[theme.mediaQueries.maxMobile]: {
					height: slim ? '0px' : '26px',
					minHeight: slim ? '0px' : '26px',
					padding: slim ? '0 24px' : '12px 24px',
					transition: 'none',
				},
			})}
			{...rest}
		>
			<span css={(theme: Theme) => ({ opacity: collapsed ? 0 : 1, transition: `opacity 300ms ${theme.animation.default}` })}>
				{children}
			</span>
		</div>
	)
}
