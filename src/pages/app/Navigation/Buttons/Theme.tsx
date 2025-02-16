import { IconMoon, IconSun } from '@tabler/icons-react'

import { useDarkMode, useResponsive } from 'states/page'

import { Tooltip } from 'components/Tooltip'

import { Separator } from '../Separator'
import { Button } from './Button'

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
				render={(props) => (
					<Button
						{...props}
						isSlim
						label={
							<>
								{globalTheme === 'light' ? (
									<IconMoon style={{ flexShrink: 0 }} />
								) : (
									<IconSun style={{ flexShrink: 0 }} />
								)}
								{globalTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
							</>
						}
						onClick={() => toggleTheme()}
					/>
				)}
			/>
		</>
	)
}
