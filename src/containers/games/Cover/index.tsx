import type { ComponentProps } from 'react'

import { CoverWrapper } from './CoverWrapper'
import { Image } from './Image'
import { Placeholder } from './Placeholder'

type Props = ComponentProps<'img'> & {
	coverUrl?: string | null,
	size?: string,
}

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
			<Image alt={alt} src={coverUrl} />
		</CoverWrapper>
	)
}
