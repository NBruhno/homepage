import type { ComponentPropsWithoutRef } from 'react'

import styled from 'styled-components'

type Props = ComponentPropsWithoutRef<'div'> & {
	isSlim?: boolean,
	isCollapsed?: boolean,
}

const Container = styled.div<Props>`
	border-top: 1px solid ${({ theme }) => theme.color.sidebarBorder};
	height: ${({ isSlim, isCollapsed }) => (isSlim || isCollapsed) ? '0px' : '18px'};
	margin: ${({ isSlim }) => isSlim ? 0 : '18px 0 2px'};
	min-height: ${({ isSlim, isCollapsed }) => (isSlim || isCollapsed) ? '0px' : '18px'};
	overflow: hidden;
	padding: ${({ isSlim, isCollapsed }) => {
		if (isSlim) return '0 24px'
		if (isCollapsed) return '4px 25px 12px'
		return '12px 25px'
	}};
	text-overflow: ellipsis;
	transition: height 300ms ${({ theme }) => theme.animation.default}, padding 300ms ${({ theme }) => theme.animation.default}, min-height 300ms ${({ theme }) => theme.animation.default};
	white-space: nowrap;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		height: ${({ isSlim }) => isSlim ? '0px' : '26px'};
		min-height: ${({ isSlim }) => isSlim ? '0px' : '26px'};
		padding: ${({ isSlim }) => isSlim ? '0 24px' : '12px 24px'};
		transition: none;
	}
`

const Text = styled.span<Props>`
	opacity: ${({ isCollapsed }) => isCollapsed ? 0 : 0.6};
	transition: opacity 300ms ${({ theme }) => theme.animation.default};
	color: ${({ theme }) => theme.isDarkTheme ? theme.color.text : theme.color.textInverted};
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-size: ${({ theme }) => theme.font.size.s80};
	display: flex;
	align-content: center;
`

export const Separator = ({ isSlim = false, isCollapsed = false, children, ...rest }: Props) => {
	return (
		<Container isCollapsed={isCollapsed} isSlim={isSlim} {...rest}>
			<Text isCollapsed={isCollapsed}>
				{children}
			</Text>
		</Container>
	)
}
