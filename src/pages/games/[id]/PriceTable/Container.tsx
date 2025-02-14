import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

export const Container = styled.div`
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: 4px;
	height: 86px;
	width: 100%;
	background-color: ${({ theme }) => adjustHsl(theme.color.background, { alpha: 0.5 })};
`
