import { styled } from 'styled-components'

export const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	z-index: 0;
	overflow: hidden;
	background-color: ${({ theme }) => theme.color.background};
	mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 500px, rgba(0, 0, 0, 0));
`
