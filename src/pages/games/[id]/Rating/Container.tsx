import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

export const Container = styled.div`
	display: grid;
	grid-template-columns: minmax(min-content, 35%) minmax(max-content, 65%);
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: 4px;
	overflow: none;
	max-height: 86px;
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => adjustHsl(theme.color.background, { alpha: 0.5 })};

`
