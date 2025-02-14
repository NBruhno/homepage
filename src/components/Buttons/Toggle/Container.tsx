import { styled } from 'styled-components'

export const Container = styled.div`
	position: relative;
	width: max-content;
	border: 1px solid ${({ theme }) => theme.color.input.border};
	border-radius: 5px;
	padding: 1px;
`
