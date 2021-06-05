import { useResponsive } from 'states/responsive'
import { useAuth } from 'states/users'

import { ButtonText as DefaultButtonText } from 'components/Buttons'
import { LoginIcon, LogoutIcon } from 'components/Icons'

const ButtonText = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
	<DefaultButtonText
		css={{ margin: '4px 12px', height: '35px' }}
		slim
		label={(
			<div css={(theme: Theme) => ({
				display: 'flex',
				alignItems: 'center',
				height: '20px',
				color: theme.darkTheme ? theme.color.text : theme.color.textInverted,
			})}
			>
				{children}
			</div>
		)}
		onClick={onClick}
	/>
)

export const ButtonAuthenticate = () => {
	const { updateResponsive, showLogin } = useResponsive()
	const { user, logout } = useAuth()

	if (user.accessToken) {
		return (
			<ButtonText onClick={async () => { await logout() }}>
				<LogoutIcon css={{ marginRight: '12px' }} />Logout
			</ButtonText>
		)
	}

	return (
		<ButtonText onClick={() => updateResponsive({ showLogin: !showLogin, showMenu: false })}>
			<LoginIcon css={{ marginRight: '12px' }} />Login
		</ButtonText>
	)
}
