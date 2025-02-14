import { styled } from 'styled-components'

export const Link = styled.a`
	color: ${({ theme }) => theme.color.gray070};
	max-height: 32px;
	max-width: 36px;
	padding: 2px;
	display: flex;
	align-items: center;
	justify-content: space-around;

	&:hover {
		color: ${({ theme }) => theme.color.gray100};
	}
`
