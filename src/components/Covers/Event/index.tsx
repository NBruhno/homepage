import { Image } from './Image'
import { Placeholder } from './Placeholder'

type Props = {
	coverUrl: string | null,
}

export const EventCover = ({ coverUrl, ...rest }: Props) => {
	if (coverUrl) return <Image src={coverUrl} {...rest} />
	return <Placeholder {...rest} />
}
