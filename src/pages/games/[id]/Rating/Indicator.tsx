import { IconMinus, IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { Spinner } from 'components/Spinner'
import { adjustHsl } from 'lib/client'
import { css, styled } from 'styled-components'

type Props = {
	rating: number | null
}

export const Indicator = styled.div.attrs<Props>(({ rating, children }) => ({
	children:
		children ??
		(() => {
			if (rating === null) return <Spinner size={20} animationDuration={1.25} />
			if (rating >= 90) return <IconThumbUp size={28} strokeWidth={1.5} />
			if (rating >= 70) return <IconThumbUp size={28} strokeWidth={1.5} />
			if (rating < 40) return <IconThumbDown size={28} strokeWidth={1.5} />
			return <IconMinus size={28} />
		})(),
}))<Props>`
	min-width: 38px;
	min-height: 38px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 2px;
	color: ${({ theme, rating }) => {
		if (rating === null) return theme.color.gray
		if (rating >= 90) return theme.color.gold
		if (rating >= 70) return theme.color.success
		if (rating < 40) return theme.color.error
		return theme.color.primary
	}};
	font-weight: ${({ theme }) => theme.font.weight.medium};
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-size: ${({ theme }) => theme.font.size.s140};
	background-color: ${({ theme }) => adjustHsl(theme.color.gray, { alpha: 0.2 })};

	> span:last-child {
		font-size: ${({ theme }) => theme.font.size.s80};
		margin-top: 8px;
	}

	${({ rating }) =>
		rating !== null &&
		rating >= 90 &&
		css`
		> span {
			filter: drop-shadow(0px 0px 3px ${({ theme }) => theme.color.gold});
		}

		> svg {
			filter: drop-shadow(0px 0px 3px ${({ theme }) => theme.color.gold});
		}
	`}
`
