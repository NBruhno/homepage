import { styled } from 'styled-components'

import { ToggleComponent } from './ToggleComponent'

type Props = {
	isChecked: boolean
	isDisabled: boolean
	isFocusVisible: boolean
	isHovered: boolean
	isLoading?: boolean
}

export const ToggleButton = styled(ToggleComponent).attrs({
	as: 'button',
})<Props>`
	border: none;
`
