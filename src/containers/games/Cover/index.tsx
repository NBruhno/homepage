import { Image } from './Image'
import { Placeholder } from './Placeholder'
import { CoverWrapper } from './CoverWrapper'

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

type Props = {
	coverUrl?: string,
	size?: string,
} & React.ComponentProps<'img'>

export const Cover = ({ size = 'big', coverUrl, ...rest }: Props) => {
	if (!coverUrl) {
		return (
			<CoverWrapper size={size} {...rest}>
				<Placeholder />
			</CoverWrapper>
		)
	}

	return (
		<CoverWrapper size={size} {...rest}>
			<Image src={coverUrl ?? placeholderImage} />
		</CoverWrapper>
	)
}
