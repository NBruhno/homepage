import type { ComponentProps } from 'react'

type Props = ComponentProps<'img'> & {
	loading?: string,
}

export const Image = ({ loading = 'lazy', ...rest }: Props) => (
	<img
		css={{
			height: '100%',
			width: '100%',
			aspectRatio: '3/4',
			objectFit: 'cover',

			// Prevent alt text from showing during image fetch
			'img:-moz-loading': {
				visibility: 'hidden',
			},
		}}
		alt='game cover'
		loading={loading}
		{...rest}
	/>
)
