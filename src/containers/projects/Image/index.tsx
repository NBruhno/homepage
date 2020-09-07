/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useModal } from 'states/modal'

import { Image } from './Image'
import { Placeholder } from './Placeholder'

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

type Props = {
	id?: string,
	coverId?: string,
	url: string,
	title: string,
} & React.ComponentProps<'img'>

export const ProjectImage = ({ id, coverId, url, title, ...rest }: Props) => {
	const { openModal } = useModal()

	if (!url) {
		return (
			<Placeholder />
		)
	}

	return (
		<div
			onClick={() => {
				openModal((
					<div
						css={{
							alignItems: 'center',
							display: 'fixed',
							justifyContent: 'center',
							padding: '24px',
							width: '100%',
						}}
					>
						<img
							src={url ?? placeholderImage}
							alt={title}
							css={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'cover' }}
						/>
					</div>
				), { noWrapper: true })
			}}
		>
			<Image src={url ?? placeholderImage} title={title} {...rest} />
		</div>
	)
}
