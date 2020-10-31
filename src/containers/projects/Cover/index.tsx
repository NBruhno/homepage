import { Image } from './Image'
import { Placeholder } from './Placeholder'
import { CoverWrapper } from './CoverWrapper'

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

type Props = {
	coverSrc?: string,
	size?: string,
} & React.ComponentProps<'img'>

export const Cover = ({ size = 'big', coverSrc, ...rest }: Props) => {
	if (!coverSrc) {
		return (
			<CoverWrapper size={size} {...rest}>
				<Placeholder />
			</CoverWrapper>
		)
	}

	return (
		<CoverWrapper size={size} {...rest}>
			<Image src={coverSrc ?? placeholderImage} />
		</CoverWrapper>
	)
}
