import { useResponsive } from 'states/page'
import { useAuth, useUser } from 'states/users'

import { ButtonText } from 'components/Buttons'
import { LoginIcon, LogoutIcon } from 'components/Icons'
import { Tooltip } from 'components/Tooltip'

export const ButtonAuthenticate = () => {
	const { setResponsiveState, showLogin, isMobile, isSidebarCollapsed } = useResponsive()
	const { onLogout } = useAuth()
	const accessToken = useUser((state) => state.accessToken)

	return (
		<Tooltip show={isSidebarCollapsed && !isMobile} tip={accessToken ? 'Logout' : 'Login'} position='right'>
			<ButtonText
				css={{ margin: '4px 12px', height: '35px' }}
				onClick={async () => {
					if (accessToken) await onLogout()
					else setResponsiveState({ showLogin: !showLogin, showMenu: false })
				}}
				label={(
					<div
						css={(theme) => ({
							display: 'flex',
							alignItems: 'center',
							columnGap: '12px',
							height: '20px',
							color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted,
							fontSize: theme.font.size.s90,
						})}
					>
						{accessToken ? (
							<>
								<LogoutIcon />
								<span>Logout</span>
							</>
						) : (
							<>
								<LoginIcon />
								<span>Login</span>
							</>
						)}
					</div>
				)}
			/>
		</Tooltip>
	)
}
