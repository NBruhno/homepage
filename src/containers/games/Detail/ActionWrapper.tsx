export const ActionWrapper = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			marginTop: '16px',
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fit, minmax(130px, max-content))',
			gridGap: '8px',
		}}
		{...props}
	/>
)
