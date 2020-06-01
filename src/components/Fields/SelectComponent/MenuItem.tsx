export type Props = {
	highlightedIndex: number,
	selectedItem: any,
	index: number,
	value: any,
} & React.ComponentProps<'div'>

export const MenuItem = ({ highlightedIndex, selectedItem, index, value, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: highlightedIndex === index ? theme.color.primary : theme.color.inputBackground,
			color: theme.color.text,
			fontWeight: selectedItem === value ? 'bold' : 'normal',
			padding: '12px',
			transition: 'all 0.3s ease',
			cursor: 'pointer',

			'&:hover': {
				backgroundColor: theme.color.inputBackgroundHover,
			},

			'&:last-of-type': {
				borderBottomLeftRadius: '4px',
				borderBottomRightRadius: '4px',
			},

			'&:first-of-type': {
				borderTopLeftRadius: '4px',
				borderTopRightRadius: '4px',
			},
		})}
		{...rest}
	/>
)
