import { Image } from './Image'
import { Placeholder } from './Placeholder'

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

type Props = {
	id?: string,
	coverId?: string,
	coverUrl?: string,
	size?: string,
} & React.ComponentProps<'img'>

export const Cover = ({ id, coverId, size = 'big', coverUrl, ...rest }: Props) => {
	if (!coverUrl) {
		return (
			<Placeholder size={size} {...rest} />
		)
	}

	return (
		<Image size={size} src={coverUrl ?? placeholderImage} {...rest} />
	)
}
