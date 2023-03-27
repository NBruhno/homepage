import type { ComponentPropsWithoutRef } from 'react'

import { IconCheck } from '@tabler/icons-react'

type Props = ComponentPropsWithoutRef<'div'> & {
	isChecked: boolean,
}

export const CheckMark = ({ isChecked, ...rest }: Props) => (
	<div
		css={(theme) => ({
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '20px',
			height: '20px',
			flexShrink: 0,
			backgroundColor: theme.color.primary,
			color: theme.color.textInverted,
			opacity: isChecked ? 1 : 0,
			borderRadius: '100%',
		})}
		{...rest}
	>
		<IconCheck size={14} />
	</div>
)
