export const Wrapper = (props: React.ComponentProps<'div'>) => (
	<div
		css={() => ({
			display: 'flex',
			textOverflow: 'ellipsis',
			justifyContent: 'space-around',
		})}
		{...props}
	/>
)
