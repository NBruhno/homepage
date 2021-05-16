type Props = {
	src: string | null,
}

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

export const Background = ({ src, ...rest }: Props) => (
	<img
		css={(theme: Theme) => ({
			width: 'calc(100% + 25px)',
			height: 'calc(100% + 25px)',
			filter: 'blur(5px) brightness(0.7)',
			background: [theme.color.inputBackgroundHover, `linear-gradient(134deg, ${theme.color.inputBorder} 0%, ${theme.color.inputBackgroundHover} 63%, ${theme.color.inputBackground} 100%)`],
			objectFit: 'cover',
			objectPosition: 'center',
			margin: '-15px',
		})}
		alt='background'
		loading='eager'
		src={src ?? placeholderImage}
		{...rest}
	/>
)
