import { styled } from 'styled-components'

type Props = {
	showPlaceholder: boolean,
}

export const Label = styled.div<Props>`
	opacity: ${({ showPlaceholder }) => showPlaceholder ? 0 : 1};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 5px 0;
	font-family: ${({ theme }) => theme.font.family.poppins};
	z-index: 1;
	line-height: ${({ theme }) => theme.font.size.s100};
	transition: opacity 0.1s ${({ theme }) => theme.animation.default};
`
