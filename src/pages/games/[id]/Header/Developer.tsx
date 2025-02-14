import { styled } from 'styled-components'

export const Developer = styled.h1`
	grid-area: developer;
	text-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.5), 0 0 12px hsla(0, 0%, 0%, 0.5);
	color: ${({ theme }) => theme.color.white};
	font-size: ${({ theme }) => theme.font.size.s160};
	margin-bottom: 16px;
	margin-top: 12px;

	${({ theme }) => theme.mediaQueries.maxWearable} {
		font-size: ${({ theme }) => theme.font.size.s80};
		word-break: break-word;
		margin-top: 6px;
	}

	${({ theme }) => theme.mediaQueries.wearableToMobile} {
		font-size: ${({ theme }) => theme.font.size.s90};
		margin-top: 8px;
	}

	${({ theme }) => theme.mediaQueries.mobileToTablet} {
		font-size: ${({ theme }) => theme.font.size.s100};
	}

	${({ theme }) => theme.mediaQueries.tabletToLaptop} {
		font-size: ${({ theme }) => theme.font.size.s115};
	}

	${({ theme }) => theme.mediaQueries.laptopToDesktop} {
		font-size: ${({ theme }) => theme.font.size.s125};
	}

	${({ theme }) => theme.mediaQueries.desktopToDesktopLarge} {
		font-size: ${({ theme }) => theme.font.size.s140};
	}
`
