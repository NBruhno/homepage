import { useResponsive } from 'states/responsive'

import { ButtonIcon } from 'components/Buttons'
import { ChevronFlip } from 'components/ChevronFlip'

export const ButtonToggle = () => {
	const { collapsedSidebar, updateResponsive } = useResponsive()
	return (
		<>
			<div css={(theme: Theme) => ({ borderTop: `1px solid ${theme.color.sidebarBorder}` })} />
			<ButtonIcon
				css={{
					margin: '6px 12px',
					height: '35px',
				}}
				onClick={() => updateResponsive({ collapsedSidebar: !collapsedSidebar })}
				title={collapsedSidebar ? 'Expand sidebar' : 'Collapse sidebar'}
				label={(
					<div
						css={(theme: Theme) => ({
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'center',
							color: theme.darkTheme ? theme.color.text : theme.color.textInverted,
							marginTop: '2px',
						})}
					>
						<ChevronFlip slim horizontal isActive={collapsedSidebar} />
					</div>
				)}
			/>
		</>
	)
}
