import { styled } from 'styled-components'

import { DefaultInputStyle } from '../DefaultInputStyle'

export type Props = {
	hasError: boolean
	isHovered: boolean
	isFocusVisible: boolean
	isDisabled: boolean
}

export const InputComponent = styled.input.attrs<Props>(({ isDisabled }) => ({
	disabled: isDisabled,
}))<Props>`
	${DefaultInputStyle}
`
