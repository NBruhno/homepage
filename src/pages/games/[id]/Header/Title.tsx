import { styled } from 'styled-components'

export const Title = styled.h1`
	grid-area: title;
	text-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.5), 0 0 12px hsla(0, 0%, 0%, 0.5);
	color: ${({ theme }) => theme.color.white};
	font-size: ${({ theme }) => theme.font.size.s160};
	margin: 0 0 8px;
	font-weight: ${({ theme }) => theme.font.weight.medium};

	${({ theme }) => theme.mediaQueries.maxWearable} {
		font-size: ${({ theme }) => theme.font.size.s100};
		word-break: break-word;
		margin: 4px 0 8px;
	}

	${({ theme }) => theme.mediaQueries.wearableToMobile} {
		font-size: ${({ theme }) => theme.font.size.s125};
		margin: 4px 0 8px;
	}

	${({ theme }) => theme.mediaQueries.mobileToTablet} {
		font-size: ${({ theme }) => theme.font.size.s140};
		margin: 0 0 8px;
	}

	${({ theme }) => theme.mediaQueries.tabletToLaptop} {
		font-size: ${({ theme }) => theme.font.size.s160};
		margin: 4px 0 8px;
	}

	${({ theme }) => theme.mediaQueries.laptopToDesktop} {
		font-size: ${({ theme }) => theme.font.size.s180};
		margin: 4px 0 8px;
	}

	${({ theme }) => theme.mediaQueries.desktopToDesktopLarge} {
		font-size: ${({ theme }) => theme.font.size.s200};
		margin: 4px 0 8px;
	}
`
