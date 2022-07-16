import { useDarkMode } from 'states/page'

import { ButtonText } from 'components/Buttons'
import { SunIcon, MoonIcon } from 'components/Icons'

import { Separator } from '../Separator'

export const ButtonTheme = () => {
	const { globalTheme, toggleTheme } = useDarkMode()

	return (
		<>
			<Separator isSlim />
			<ButtonText
				css={{ margin: '6px 12px 7px', height: '35px' }}
				isSlim
				label={(
					<div css={{ display: 'flex', alignItems: 'center', height: '20px' }}>
						{globalTheme === 'light' ? <MoonIcon css={{ marginRight: '12px' }} /> : <SunIcon css={{ marginRight: '12px' }} />}
						{globalTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
					</div>
				)}
				onClick={() => toggleTheme()}
			/>
		</>
	)
}