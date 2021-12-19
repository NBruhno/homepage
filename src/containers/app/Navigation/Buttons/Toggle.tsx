import { useResponsive } from 'states/responsive'

import { ButtonIcon } from 'components/Buttons'
import { ChevronFlip } from 'components/ChevronFlip'

export const ButtonToggle = () => {
	const { isSidebarCollapsed, updateResponsive } = useResponsive()
	return (
		<>
			<div css={(theme) => ({ borderTop: `1px solid ${theme.color.sidebarBorder}` })} />
			<ButtonIcon
				css={{
					margin: '6px 12px',
					height: '35px',
				}}
				onClick={() => updateResponsive({ isSidebarCollapsed: !isSidebarCollapsed })}
				title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				label={(
					<div
						css={(theme) => ({
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'center',
							color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted,
							marginTop: '2px',
						})}
					>
						<ChevronFlip isHorizontal isActive={isSidebarCollapsed} />
					</div>
				)}
			/>
		</>
	)
}
