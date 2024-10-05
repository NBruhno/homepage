import styled from 'styled-components'

import { useResponsive } from 'states/page'

import { ButtonIcon } from 'components/Buttons'
import { Label } from 'components/Buttons/Async/Label'
import { ChevronFlip } from 'components/ChevronFlip'

import { Separator } from '../Separator'

export const Button = styled(ButtonIcon)`
 	margin: 6px 12px;

	> ${Label} {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: ${({ theme }) => theme.isDarkTheme ? theme.color.text : theme.color.textInverted};
		margin-top: 2px;
	}
`

export const ButtonToggle = () => {
	const { isSidebarCollapsed, setResponsiveState } = useResponsive()
	return (
		<>
			<Separator isSlim />
			<Button
				onClick={() => setResponsiveState({ isSidebarCollapsed: !isSidebarCollapsed })}
				title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				label={<ChevronFlip isHorizontal isActive={isSidebarCollapsed} />}
			/>
		</>
	)
}
