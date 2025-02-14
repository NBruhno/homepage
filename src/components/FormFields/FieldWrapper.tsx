import { styled } from 'styled-components'

type Props = {
	isHidden?: boolean
	isSlim?: boolean
	isFullWidth?: boolean | undefined
	minWidth?: number
}

export const FieldWrapper = styled.div<Props>`
	display: ${({ isFullWidth }) => (isFullWidth ? 'block' : 'inline-block')};
	height: ${({ isHidden }) => (isHidden ? 0 : 'auto')};
	margin-bottom: ${({ isHidden, isSlim }) => (isHidden || isSlim ? 0 : '25px')};
	min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : 'auto')};
	overflow: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`
