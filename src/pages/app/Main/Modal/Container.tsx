import type { ComponentPropsWithRef } from 'react'

import { styled } from 'styled-components'

import { useResponsive } from 'states/page'

type Props = ComponentPropsWithRef<'div'> & {
	hasNoWrapper: boolean
	show: boolean
}

const Wrapper = styled.div<Props & { isSidebarCollapsed: boolean }>`
	inset: 0px;
	position: fixed;
	display: flex;
	pointer-events: none;
	transition: opacity 135ms ${({ theme }) => theme.animation.default}, padding-left 300ms ${({ theme }) => theme.animation.default};
	visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
	z-index: 5;
	margin: 0;
	padding-left: ${({ isSidebarCollapsed }) => (isSidebarCollapsed ? '70px' : '250px')};

	${({ theme }) => theme.mediaQueries.maxMobile} {
		padding-left: 0;
		transition: none;
	}
`

const Content = styled.div<Pick<Props, 'show'>>`
	display: flex;
	margin: auto;
	max-width: 100%;
	padding: 24px;
	pointer-events: none;
	visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
	width: 450px;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		padding: 0;
		width: 100%;
		margin-bottom: 0;
	}
`

const Wrap = styled.div<Pick<Props, 'show'>>`
	pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
	width: 100%;
`

export const Container = ({ hasNoWrapper, show, children, ...rest }: Props) => {
	const { isSidebarCollapsed } = useResponsive()

	return (
		<Wrapper isSidebarCollapsed={isSidebarCollapsed} hasNoWrapper={hasNoWrapper} show={show} {...rest}>
			{hasNoWrapper ? (
				children
			) : (
				<Content show={show}>
					<Wrap show={show}>{children}</Wrap>
				</Content>
			)}
		</Wrapper>
	)
}
