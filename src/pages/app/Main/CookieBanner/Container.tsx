import { adjustHsl } from 'lib/client'
import { styled } from 'styled-components'

export const Container = styled.div`
	position: fixed;
	bottom: 54px;
	right: 64px;
	background-color: ${({ theme }) => (theme.isDarkTheme ? theme.color.backgroundHover : theme.color.gray010)};
	padding: 16px 24px;
	border-radius: 8px;
	font-size: ${({ theme }) => theme.font.size.s90};
	color: ${({ theme }) => theme.color.textFaded};
	display: flex;
	align-items: center;
	column-gap: 16px;
	border: 1px solid ${({ theme }) => theme.color.border};
	z-index: 1;

	${({ theme }) => theme.mediaQueries.maxLaptop} {
		right: 32px;
	}

	${({ theme }) => theme.mediaQueries.maxTablet} {
		right: 0;
		border-radius: 4px 0 0 4px;
		border-right: none;
	}

	${({ theme }) => theme.mediaQueries.maxMobile} {
		bottom: 0;
		right: 0;
		left: 0;
		border-radius: 0;
		border: none;
		border-top: 1px solid ${({ theme }) => theme.color.border};
		justify-content: center;
	}

	@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px))) {
		backdrop-filter: blur(8px);
		background-color: ${({ theme }) => (theme.isDarkTheme ? adjustHsl(theme.color.backgroundHover, { alpha: 0.85 }) : adjustHsl(theme.color.gray010, { alpha: 0.85 }))};
	}
`
