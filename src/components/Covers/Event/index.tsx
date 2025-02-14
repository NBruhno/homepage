import type { CSSProperties } from 'styled-components'
import { Image } from './Image'
import { Placeholder } from './Placeholder'

type Props = {
	coverUrl: string | null
	style?: CSSProperties
	className?: string
}

export const EventCover = ({ coverUrl, ...rest }: Props) => {
	if (coverUrl) return <Image src={coverUrl} alt='game event logo' {...rest} />
	return <Placeholder {...rest} />
}
