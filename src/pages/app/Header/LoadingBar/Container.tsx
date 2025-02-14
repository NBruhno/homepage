import { styled } from 'styled-components'

export const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 2px;
	background: transparent;
	z-index: 999; // Should always be at the very top
`
