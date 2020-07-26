import { ActivityIndicator } from 'components/ActivityIndicator'

export const Loader = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			alignItems: 'center',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			minHeight: '100px',
			minWidth: '100px',
		}}
		{...props}
	>
		<ActivityIndicator />
	</div>
)
