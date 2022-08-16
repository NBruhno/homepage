import { useDarkMode, useResponsive } from 'states/page'

import { ButtonText } from 'components/Buttons'
import { SunIcon, MoonIcon } from 'components/Icons'
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
					css={{ margin: '6px 12px 7px', height: '35px' }}
					isSlim
					label={(
						<div
							css={{
								display: 'flex',
								alignItems: 'center',
								height: '20px',
								columnGap: '12px',
								lineHeight: '12px',
							}}
						>
							{globalTheme === 'light' ? <MoonIcon /> : <SunIcon />}
							{globalTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
						</div>
					)}
					onClick={() => toggleTheme()}
				/>
			</Tooltip>
		</>
	)
}
