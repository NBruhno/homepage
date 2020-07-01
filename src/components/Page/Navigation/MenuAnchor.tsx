export const MenuAnchor = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			touchAction: 'manipulation',
			position: 'relative',
			userSelect: 'none',
			cursor: 'pointer',
		}}
		{...props}
	/>
)
