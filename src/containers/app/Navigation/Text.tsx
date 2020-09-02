/* eslint-disable jsx-a11y/anchor-has-content */
export const Text = (props: React.ComponentProps<'span'>) => (
	<span
		css={{
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			color: 'currentColor',
		}}
		{...props}
	/>
)
