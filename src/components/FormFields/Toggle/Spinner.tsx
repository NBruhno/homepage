import { styled } from 'styled-components'

import { Spinner as DefaultSpinner } from 'components/Spinner'

type Props = {
	isLoading: boolean
	isChecked: boolean
}

export const Spinner = styled(DefaultSpinner).attrs({
	size: 16,
})<Props>`
	position: relative;
	transition: margin 0.15s, opacity 0.15s;
	margin: ${({ isLoading, isChecked }) => {
		if (isLoading) return '2px 0 0'
		else if (isChecked) return '2px -18px 0 0'
		else return '2px 0 0 -18px'
	}};
	opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
`
