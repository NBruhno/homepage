import { useResponsive } from 'states/page'

import { ButtonIcon } from 'components/Buttons'
import { ChevronFlip } from 'components/ChevronFlip'

import { Separator } from '../Separator'

export const ButtonToggle = () => {
	const { isSidebarCollapsed, setResponsiveState } = useResponsive()
	return (
		<>
			<Separator isSlim />
			<ButtonIcon
				css={{
					margin: '6px 12px',
				}}
				onClick={() => setResponsiveState({ isSidebarCollapsed: !isSidebarCollapsed })}
				title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				labelCss={(theme) => ({
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
					color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted,
					marginTop: '2px',
				})}
				label={<ChevronFlip isHorizontal isActive={isSidebarCollapsed} />}
			/>
		</>
	)
}
