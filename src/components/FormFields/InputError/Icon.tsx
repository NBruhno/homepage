import { IconAlertCircle } from '@tabler/icons'

export const Icon = () => (
	<IconAlertCircle
		size={20}
		css={(theme) => ({
			color: theme.color.white,
			margin: '8px 0 0 5px',
		})}
	/>
)
