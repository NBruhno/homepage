export const Wrapper = (props: React.ComponentProps<'div'>) => (
	<div
		css={() => ({
			display: 'flex',
		})}
		{...props}
	/>
)
