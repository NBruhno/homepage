export const Wrapper = (props: React.ComponentProps<'div'>) => (
	<div
		css={() => ({
			display: 'flex',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			justifyContent: 'space-around',
		})}
		{...props}
	/>
)
