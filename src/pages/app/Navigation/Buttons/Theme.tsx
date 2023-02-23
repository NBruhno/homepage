import { IconMoon, IconSun } from '@tabler/icons-react'

import { useDarkMode, useResponsive } from 'states/page'

import { ButtonText } from 'components/Buttons'
import { Tooltip } from 'components/Tooltip'

import { Separator } from '../Separator'

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
				<ButtonText
					css={{ margin: '6px 12px 7px', padding: '0 12px' }}
					isSlim
					labelCss={(theme) => ({
						display: 'flex',
						alignItems: 'center',
						columnGap: '12px',
						color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted,
					})}
					label={(
						<>
							{globalTheme === 'light' ? <IconMoon css={{ flexShrink: 0 }} /> : <IconSun css={{ flexShrink: 0 }} />}
							{globalTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
						</>
					)}
					onClick={() => toggleTheme()}
				/>
			</Tooltip>
		</>
	)
}
