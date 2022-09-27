import type { ComponentPropsWithoutRef } from 'react'
import type { GameImagePlaceholder } from 'types'

import { useLoading } from 'states/page'

import { Image } from './Image'
import { Placeholder } from './Placeholder'
import { Shine } from './Shine'

type Props = ComponentPropsWithoutRef<'img'> & {
	coverUrl?: string | null,
	imageProps?: GameImagePlaceholder,
	isPriority?: boolean,
	isShineVisible?: boolean,
}

export const Cover = ({ coverUrl, imageProps, isPriority = false, isShineVisible = false, ...rest }: Props) => {
	const { isLoading } = useLoading()

	if (!coverUrl || isLoading) return <Placeholder />
	return (
		<div css={{ position: 'relative', overflow: 'hidden' }}>
			<Image isPriority={isPriority} imageProps={imageProps} src={coverUrl} {...rest} />
			<Shine isVisible={isShineVisible} />
		</div>
	)
}
