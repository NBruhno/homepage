import type { ComponentPropsWithoutRef } from 'react'

import { CoverWrapper } from './CoverWrapper'
import { Image } from './Image'
import { Placeholder } from './Placeholder'

type Props = ComponentPropsWithoutRef<'img'> & {
	coverSrc?: string | undefined,
	size?: string,
}

export const Cover = ({ size = 'big', coverSrc, alt, ...rest }: Props) => {
	if (!coverSrc) {
		return (
			<CoverWrapper size={size} {...rest}>
				<Placeholder />
			</CoverWrapper>
		)
	}

	return (
		<CoverWrapper size={size} {...rest}>
			<Image alt={alt} src={coverSrc} />
		</CoverWrapper>
	)
}
