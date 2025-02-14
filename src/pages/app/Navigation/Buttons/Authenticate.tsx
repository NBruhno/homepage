import { IconLogin, IconLogout } from '@tabler/icons-react'

import { useResponsive } from 'states/page'
import { useAuth, useUser } from 'states/users'

import { Tooltip } from 'components/Tooltip'
import { Button } from './Button'

export const ButtonAuthenticate = () => {
	const { setResponsiveState, showLogin, isMobile, isSidebarCollapsed } = useResponsive()
	const { onLogout } = useAuth()
	const accessToken = useUser((state) => state.accessToken)

	return (
		<Tooltip
			show={isSidebarCollapsed && !isMobile}
			tip={accessToken ? 'Logout' : 'Login'}
			position='right'
			render={(props) => (
				<Button
					{...props}
					style={{ margin: '4px 12px', height: '35px', padding: '0 14px' }}
					onClick={async () => {
						if (accessToken) await onLogout()
						else setResponsiveState({ showLogin: !showLogin, showMenu: false })
					}}
					label={
						accessToken ? (
							<>
								<IconLogout style={{ flexShrink: 0 }} />
								<span>Logout</span>
							</>
						) : (
							<>
								<IconLogin style={{ flexShrink: 0 }} />
								<span>Login</span>
							</>
						)
					}
				/>
			)}
		/>
	)
}
