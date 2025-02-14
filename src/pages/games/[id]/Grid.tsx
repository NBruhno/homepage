import { styled } from 'styled-components'

export const Grid = styled.article`
	display: grid;
	grid-template:
		"cover headlines headlines headlines" 214px
		"cover actions actions info" auto
		"cover priceTable ratings info" auto
		"content content content info" 1fr
		"similarGames similarGames similarGames similarGames" auto
		/ 264px 1fr 1fr 330px;
	margin: 262px auto 0;
	z-index: 1;
	width: 100%;
	max-width: 1300px;
	transition: width 300ms ${({ theme }) => theme.animation.default};
	position: relative;
	gap: 12px 14px;

	${({ theme }) => theme.mediaQueries.desktopToDesktopLarge} {
		grid-template:
			"cover headlines headlines headlines" 214px
			"cover actions actions actions" auto
			"cover priceTable priceTable ratings" auto
			"content content content info" 1fr
			"similarGames similarGames similarGames similarGames" auto
			/ 264px 1fr 1fr 330px;
	}

	${({ theme }) => theme.mediaQueries.tabletToDesktop} {
		grid-template:
			"cover headlines headlines headlines" 214px
			"cover actions actions actions" auto
			"priceTable priceTable priceTable info" auto
			"ratings ratings ratings info" auto
			"content content content info" 1fr
			"similarGames similarGames similarGames similarGames" auto
			/ 196px 1fr 1fr minmax(auto, 250px);
	}

	${({ theme }) => theme.mediaQueries.mobileToTablet} {
		grid-template:
			"cover headlines headlines" 214px
			"actions actions actions" auto
			"priceTable priceTable priceTable" auto
			"ratings ratings ratings" auto
			"content content content" auto
			"info info info" auto
			"similarGames similarGames similarGames" auto
			/ 153px 1fr minmax(auto, 200px);
	}

	${({ theme }) => theme.mediaQueries.maxMobile} {
		margin: 86px auto 0;
		grid-template-columns: auto auto;
		grid-template:
			"cover headlines" 1fr
			"actions actions" auto
			"websites websites" auto
			"priceTable priceTable" auto
			"ratings ratings" auto
			"content content" auto
			"info info" auto
			"similarGames similarGames" auto
			/ minmax(0, 116px) 2fr;
	}
`
