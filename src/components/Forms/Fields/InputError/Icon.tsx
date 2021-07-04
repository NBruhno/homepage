import { AlertIcon } from 'components/Icons'

export const Icon = () => (
	<AlertIcon
		size={20}
		css={(theme) => ({
			color: theme.color.white,
			margin: '8px 0 0 5px',
		})}
	/>
)
