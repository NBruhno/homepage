import { IconLogin, IconLogout } from '@tabler/icons-react'
import styled from 'styled-components'

import { useResponsive } from 'states/page'
import { useAuth, useUser } from 'states/users'

import { ButtonText } from 'components/Buttons'
import { Label } from 'components/Buttons/Async/Label'
import { Tooltip } from 'components/Tooltip'

export const Button = styled(ButtonText)`
	margin: 4px 12px;
	height: 35px;
	padding: 0 14px;

	> ${Label} {
		display: flex;
		align-items: center;
		column-gap: 8px;
		height: 20px;
		color: ${({ theme }) => theme.isDarkTheme ? theme.color.text : theme.color.textInverted};
		font-size: ${({ theme }) => theme.font.size.s90};
	}
`

export const ButtonAuthenticate = () => {
	const { setResponsiveState, showLogin, isMobile, isSidebarCollapsed } = useResponsive()
	const { onLogout } = useAuth()
	const accessToken = useUser((state) => state.accessToken)

	return (
		<Tooltip show={isSidebarCollapsed && !isMobile} tip={accessToken ? 'Logout' : 'Login'} position='right'>
			<Button
				style={{ margin: '4px 12px', height: '35px', padding: '0 14px' }}
				onClick={async () => {
					if (accessToken) await onLogout()
					else setResponsiveState({ showLogin: !showLogin, showMenu: false })
				}}
				label={(
					<>
						{accessToken ? (
							<>
								<IconLogout style={{ flexShrink: 0 }} />
								<span>Logout</span>
							</>
						) : (
							<>
								<IconLogin style={{ flexShrink: 0 }} />
								<span>Login</span>
							</>
						)}
					</>
				)}
			/>
		</Tooltip>
	)
}
