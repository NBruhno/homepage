import { AlertCircleIcon } from 'components/Icons'

export const Icon = () => (
	<AlertCircleIcon
		size={20}
		css={(theme: Theme) => ({
			color: theme.color.white,
			margin: '8px 0 0 5px',
		})}
	/>
)
