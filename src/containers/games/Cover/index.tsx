import type { ComponentPropsWithoutRef } from 'react'
import type { GameImagePlaceholder } from 'types'

import { useLoading } from 'states/isLoading'

import { CoverWrapper } from './CoverWrapper'
import { Image } from './Image'
import { Placeholder } from './Placeholder'

type Props = ComponentPropsWithoutRef<'img'> & {
	coverUrl?: string | null,
	size?: string,
	imageProps?: GameImagePlaceholder,
}

export const Cover = ({ coverUrl, imageProps, ...rest }: Props) => {
	const { isLoading } = useLoading()

	if (!coverUrl || isLoading) {
		return (
			<CoverWrapper {...rest}>
				<Placeholder />
			</CoverWrapper>
		)
	}

	return (
		<CoverWrapper {...rest}>
			<Image imageProps={imageProps} src={coverUrl} />
		</CoverWrapper>
	)
}
