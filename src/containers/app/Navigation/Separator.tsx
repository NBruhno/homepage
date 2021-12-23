import type { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
	isSlim?: boolean,
	isCollapsed?: boolean,
}

export const Separator = ({ isSlim = false, isCollapsed = false, children, ...rest }: Props) => {
	const padding = () => {
		if (isSlim) return '0 24px'
		if (isCollapsed) return '4px 25px 12px'
		return '12px 25px'
	}

	return (
		<div
			css={(theme) => ({
				borderTop: `1px solid ${theme.color.sidebarBorder}`,
				height: ((isSlim || isCollapsed)) ? '0px' : '18px',
				margin: isSlim ? 0 : '18px 0 2px',
				minHeight: ((isSlim || isCollapsed)) ? '0px' : '18px',
				overflow: 'hidden',
				padding: padding(),
				textOverflow: 'ellipsis',
				transition: `height 300ms ${theme.animation.default}, padding 300ms ${theme.animation.default}, min-height 300ms ${theme.animation.default}`,
				whiteSpace: 'nowrap',

				[theme.mediaQueries.maxMobile]: {
					height: isSlim ? '0px' : '26px',
					minHeight: isSlim ? '0px' : '26px',
					padding: isSlim ? '0 24px' : '12px 24px',
					transition: 'none',
				},
			})}
			{...rest}
		>
			<span
				css={(theme) => ({
					opacity: isCollapsed ? 0 : 0.6,
					transition: `opacity 300ms ${theme.animation.default}`,
					color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted,
					fontFamily: theme.font.family.poppins,
					fontSize: theme.font.size.s80,
					display: 'flex',
					alignContent: 'center',
				})}
			>
				{children}
			</span>
		</div>
	)
}
