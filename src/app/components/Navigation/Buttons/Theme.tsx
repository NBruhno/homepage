import { IconMoon, IconSun } from '@tabler/icons-react'
import styled from 'styled-components'

import { useDarkMode, useResponsive } from 'states/page'

import { ButtonText } from 'components/Buttons'
import { Label } from 'components/Buttons/Async/Label'
import { Tooltip } from 'components/Tooltip'

import { Separator } from '../Separator'

export const Button = styled(ButtonText)`
 	margin: 6px 12px 7px;
	padding: 0 12px;

	> ${Label} {
		display: flex;
		align-items: center;
		column-gap: 12px;
		color: ${({ theme }) => theme.isDarkTheme ? theme.color.text : theme.color.textInverted};
	}
`

export const ButtonTheme = () => {
	const { globalTheme, toggleTheme } = useDarkMode()
	const { isSidebarCollapsed, isMobile } = useResponsive()

	return (
		<>
			<Separator isSlim />
			<Tooltip
				tip={globalTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
				show={isSidebarCollapsed && !isMobile}
				position='right'
			>
				<Button
					isSlim
					label={(
						<>
							{globalTheme === 'light' ? <IconMoon style={{ flexShrink: 0 }} /> : <IconSun style={{ flexShrink: 0 }} />}
							{globalTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
						</>
					)}
					onClick={() => toggleTheme()}
				/>
			</Tooltip>
		</>
	)
}
