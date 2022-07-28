import type { ComponentPropsWithoutRef } from 'react'
import type { GameImagePlaceholder } from 'types'

import { useLoading } from 'states/page'

import { Image } from './Image'
import { Placeholder } from './Placeholder'

type Props = ComponentPropsWithoutRef<'img'> & {
	coverUrl?: string | null,
	imageProps?: GameImagePlaceholder,
	isPriority?: boolean,
}

export const Cover = ({ coverUrl, imageProps, isPriority = false, ...rest }: Props) => {
	const { isLoading } = useLoading()

	if (!coverUrl || isLoading) return <Placeholder />
	return <Image isPriority={isPriority} imageProps={imageProps} src={coverUrl} {...rest} />
}
