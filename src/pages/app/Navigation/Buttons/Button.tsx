import { ButtonText } from 'components/Buttons'
import { Label } from 'components/Buttons/Async/Label'
import { styled } from 'styled-components'

export const Button = styled(ButtonText)`
	margin: 4px 12px;
	height: 35px;
	padding: 0 11px;

	> ${Label} {
		display: flex;
		align-items: center;
		column-gap: 11px;
		height: 20px;
		font-size: ${({ theme }) => theme.font.size.s90};
		color: ${({ theme }) => (theme.isDarkTheme ? theme.color.text : theme.color.textInverted)};
	}
`
