import type { ReactNode } from 'react'

import { useResponsive } from 'states/page'
import { useAuth, useUser } from 'states/users'

import { ButtonText as DefaultButtonText } from 'components/Buttons'
import { LoginIcon, LogoutIcon } from 'components/Icons'

const ButtonText = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => (
	<DefaultButtonText
		css={{ margin: '4px 12px', height: '35px' }}
		isSlim
		label={(
			<div css={(theme) => ({
				display: 'flex',
				alignItems: 'center',
				height: '20px',
				color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted,
			})}
			>
				{children}
			</div>
		)}
		onClick={onClick}
	/>
)

export const ButtonAuthenticate = () => {
	const { setResponsiveState, showLogin } = useResponsive()
	const { onLogout } = useAuth()
	const accessToken = useUser((state) => state.accessToken)

	if (accessToken) {
		return (
			<ButtonText onClick={async () => { await onLogout() }}>
				<LogoutIcon css={{ marginRight: '12px' }} />Logout
			</ButtonText>
		)
	}

	return (
		<ButtonText onClick={() => setResponsiveState({ showLogin: !showLogin, showMenu: false })}>
			<LoginIcon css={{ marginRight: '12px' }} />Login
		</ButtonText>
	)
}