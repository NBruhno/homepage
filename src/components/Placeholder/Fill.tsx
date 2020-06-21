type Props = {
	width: string | number,
}

export const Fill = ({ width }: Props) => (
	<span
		css={{
			display: 'inline-block',
			backgroundColor: 'currentColor',
			height: '0.8em',
			borderRadius: '0.4em',
			opacity: 0.2,
			width,
			verticalAlign: 'top',
		}}
	/>
)
