import { useResponsive } from 'states/page'

import { ButtonIcon } from 'components/Buttons'
import { ChevronFlip } from 'components/ChevronFlip'

import { Label } from 'components/Buttons/Async/Label'
import { styled } from 'styled-components'
import { Separator } from '../Separator'

const LeftAlignedButtonIcon = styled(ButtonIcon)`
	margin: 6px 11px;

	> ${Label} {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 3px;
		color: ${({ theme }) => (theme.isDarkTheme ? theme.color.text : theme.color.textInverted)};
	}
`

export const ButtonToggle = () => {
	const { isSidebarCollapsed, setResponsiveState } = useResponsive()
	return (
		<>
			<Separator isSlim />
			<LeftAlignedButtonIcon
				onClick={() => setResponsiveState({ isSidebarCollapsed: !isSidebarCollapsed })}
				title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				label={<ChevronFlip isHorizontal isActive={isSidebarCollapsed} />}
			/>
		</>
	)
}
