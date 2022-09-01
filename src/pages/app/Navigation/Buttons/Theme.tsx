import { IconMoon, IconSun } from '@tabler/icons'

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
					labelCss={() => ({
						display: 'flex',
						alignItems: 'center',
						columnGap: '12px',
					})}
					label={(
						<>
							{globalTheme === 'light' ? <IconMoon /> : <IconSun />}
							{globalTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
						</>
					)}
					onClick={() => toggleTheme()}
				/>
			</Tooltip>
		</>
	)
}
