import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

import type { Props as AsyncProps } from 'components/Buttons/Async'
import { ButtonAsync } from 'components/Buttons/Async'

type Props = AsyncProps & {
	orientation: 'left' | 'right'
}

export const Button = styled(ButtonAsync)<Props>`
	background-color: ${({ theme }) => theme.color.background};
	color: ${({ theme }) => theme.color.text};
	padding: 0;
	margin: 0;
	width: 40px;
	min-width: unset;
	height: unset;
	outline: none;
	border-top-left-radius: ${({ orientation }) => (orientation === 'left' ? '8px' : 0)};
	border-bottom-left-radius: ${({ orientation }) => (orientation === 'left' ? '8px' : 0)};
	border-top-right-radius: ${({ orientation }) => (orientation === 'right' ? '8px' : 0)};
	border-bottom-right-radius: ${({ orientation }) => (orientation === 'right' ? '8px' : 0)};
	border-width: ${({ orientation }) => (orientation === 'left' ? '1px 0 1px 1px' : '1px 1px 1px 0')};
	border-style: solid;
	border-color: ${({ theme }) => theme.color.border};

	&:hover {
		background-color: ${({ theme }) => adjustHsl(theme.color.primaryLighter, { alpha: 0.3 })};
		border-color: ${({ theme }) => theme.color.primary};
	}
`
