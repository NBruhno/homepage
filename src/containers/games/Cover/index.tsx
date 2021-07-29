import type { ComponentProps } from 'react'

import { CoverWrapper } from './CoverWrapper'
import { Image } from './Image'
import { Placeholder } from './Placeholder'

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

type Props = {
	coverUrl?: string | null,
	size?: string,
} & ComponentProps<'img'>

export const Cover = ({ size = 'big', coverUrl, alt, ...rest }: Props) => {
	if (!coverUrl) {
		return (
			<CoverWrapper size={size} {...rest}>
				<Placeholder />
			</CoverWrapper>
		)
	}

	return (
		<CoverWrapper size={size} {...rest}>
			<Image alt={alt} src={coverUrl ?? placeholderImage} />
		</CoverWrapper>
	)
}
