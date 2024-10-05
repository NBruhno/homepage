import { css, styled } from 'styled-components'

type Props = {
	shouldFill?: boolean,
	transitionTime?: number,
	isAnimated?: boolean,
}

export const Container = styled.div<Props>`
	overflow: hidden;
	transition: ${({ isAnimated, transitionTime }) => (isAnimated ? `height ${transitionTime}s` : 'none')};

	${({ shouldFill }) => shouldFill && css`
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	`}
`
