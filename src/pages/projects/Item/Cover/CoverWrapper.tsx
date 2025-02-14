import { styled } from 'styled-components'

type Props = {
	size: string
	loading?: string | undefined
}

export const CoverWrapper = styled.div<Props>`
	flex-shrink: 0;
	background: ${({ theme }) => [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`]};
	height: ${({ size }) => (size === 'big' ? '352px' : '160px')};
	width: ${({ size }) => (size === 'big' ? '264px' : '120px')};
	overflow: hidden;
	object-fit: cover;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		height: 160px;
		width: 120px;
	}

	${({ theme }) => theme.mediaQueries.mobileToLaptop} {
		height: ${({ size }) => (size === 'big' ? '235px' : '160px')};
		width: ${({ size }) => (size === 'big' ? '176px' : '120px')};
	}
`
