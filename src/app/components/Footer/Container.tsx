import styled from 'styled-components'

type Props = {
	isTransparent: boolean,
}

export const Container = styled.footer<Props>`
	background-color: ${({ isTransparent, theme }) => (isTransparent ? 'transparent' : theme.color.background)};
	border-top: ${({ isTransparent, theme }) => (isTransparent ? 'none' : `1px solid ${theme.color.border}`)};
	bottom: 0;
	color: ${({ isTransparent, theme }) => (isTransparent ? theme.color.white : theme.color.text)};
	height: 73px;
	margin-top: auto;
	padding: 12px 24px;
	vertical-align: bottom;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		text-align: center;
	}
`
