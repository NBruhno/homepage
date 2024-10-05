import { IconTicket } from '@tabler/icons-react'
import { styled } from 'styled-components'

import { useLoading } from 'states/page'

export const PlaceholderLine = styled.div`
	background: ${({ theme }) => theme.color.input.background};
	background: ${({ theme }) => `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`};
	border-radius: 8px;
	color: ${({ theme }) => theme.color.grayLight};
	height: 100%;
	width: 100%;
	margin: 0;
	object-fit: cover;
	aspect-ratio: 16 / 9;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		width: 100%;
		max-width: unset;
		height: auto;
		max-height: unset;
	}
`

export const Placeholder = () => {
	const { isLoading } = useLoading()

	return (
		<PlaceholderLine>
			{!isLoading && <IconTicket size={48} />}
		</PlaceholderLine>
	)
}
