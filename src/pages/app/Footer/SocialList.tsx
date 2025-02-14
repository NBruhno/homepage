import { styled } from 'styled-components'

export const SocialList = styled.ul`
	display: inline-flex;
	vertical-align: middle;
	margin: 0 0 8px -12px;
	padding: 0;
	list-style: none;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		margin-left: 0;
	}
`
