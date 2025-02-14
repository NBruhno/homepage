import { css, styled } from 'styled-components'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	hasError: boolean
	isDisabled: boolean
	isFocus: boolean
	isFocusVisible: boolean
	isHovered: boolean
}

export const InputContainer = styled.div<Props>`
	display: flex;
	column-gap: 8px;
	justify-content: space-between;
	cursor: text;

	${DefaultInputStyle}

	${({ isFocus, hasError, theme }) =>
		isFocus &&
		css`
		border-color: ${hasError ? theme.color.error : theme.color.primary};
	`}
`
