import { IconMenu2 } from '@tabler/icons-react'
import { styled } from 'styled-components'

export const MenuIcon = styled(IconMenu2)`
	color: ${({ theme }) => (theme.isDarkTheme ? theme.color.text : theme.color.textInverted)};
`
