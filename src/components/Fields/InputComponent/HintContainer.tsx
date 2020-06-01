export const HintContainer = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
		}}
		{...props}
	/>
)
