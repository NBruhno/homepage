import { styled } from 'styled-components'

type Props = {
	maxWidth?: number
}

export const PageContent = styled.div<Props>`
	max-width: ${({ maxWidth = 700 }) => `${maxWidth}px`};
	margin: 0 auto;
`
