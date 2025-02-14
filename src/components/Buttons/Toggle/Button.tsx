import { styled } from 'styled-components'

import { ButtonAsync } from '../Async'
import { Label } from '../Async/Label'

export const Button = styled(ButtonAsync)`
	background-color: transparent;
	font-size: ${({ theme }) => theme.font.size.s80};
	padding: 8px;
	height: unset;

	&:first-of-type {
		border-radius: 4px 0 0 4px;
	}

	&:last-of-type {
		border-radius: 0 4px 4px 0;
	}

	&:disabled {
		color: ${({ theme }) => theme.color.grayLight};
		background-color: transparent;
		border: 1px solid ${({ theme }) => theme.color.gray};
	}

	${Label} {
		color: ${({ theme }) => theme.color.text};
		position: relative;
		padding: 0;
		z-index: 1;
	}
`
