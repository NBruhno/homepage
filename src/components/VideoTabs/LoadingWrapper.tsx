import { css, styled } from 'styled-components'

type Props = {
	isLoading: boolean
}

export const LoadingWrapper = styled.div<Props>`
	width: 100%;

	${({ isLoading, theme }) =>
		isLoading
			? css`
			height: 100%;
			padding-bottom: 56.25%;
			background-color: ${theme.color.gray};
		`
			: css`
			border-width: 1px 0;
			border-style: solid;
			border-color: ${theme.color.border};
			padding-bottom:
		`}
`
