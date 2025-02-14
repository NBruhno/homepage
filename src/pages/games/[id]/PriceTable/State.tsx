import { styled } from 'styled-components'

type Props = {
	state: 'yes' | 'no'
}

export const State = styled.div<Props>`
	height: 6px;
	width: 6px;
	margin-top: 6px;
	border-radius: 100%;
	flex-shrink: 0;
	flex-grow: 0;
	align-self: flex-start;
	
	background-color: ${({ theme, state }) => (state === 'yes' ? theme.color.success : theme.color.error)};
`
