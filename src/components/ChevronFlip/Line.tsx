export type Props = {
	bold?: boolean,
	isActive?: boolean,
	mirror?: boolean,
	slim?: boolean,
} & React.ComponentProps<'span'>

export const Line = ({ slim, bold, mirror, isActive, ...rest }: Props) => {
	let size = 0.1

	if (slim) {
		size = 0.05
	} else if (bold) {
		size = 0.15
	}

	return (
		<span
			css={{
				backgroundColor: 'currentColor',
				borderRadius: `${size / 2}em`,
				bottom: '0.1em',
				height: `${size}em`,
				left: `${0.7 - size / 2}em`,
				position: 'absolute',
				transform: `translateY(${isActive ? -0.4 : 0}em) rotate(${-90 + (mirror ? -1 : 1) * (isActive ? 135 : 45)}deg)`,
				transformOrigin: `${size / 2}em ${size / 2}em`,
				transition: 'transform 0.15s',
				width: '0.6em',
			}}
			{...rest}
		/>
	)
}
