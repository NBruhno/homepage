type Props = {
	width: number | string,
}

export const Fill = ({ width }: Props) => (
	<span
		css={{
			display: 'inline-block',
			backgroundColor: 'currentColor',
			height: 'calc(1em - 3px)',
			borderRadius: '0.4em',
			opacity: 0.2,
			marginTop: '3px',
			width,
		}}
	/>
)
