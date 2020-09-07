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
			{...rest}
			onClick={() => {
				openModal((
					<div
						css={{
							width: '100%',
							display: 'fixed',
							justifyContent: 'center',
							alignItems: 'center',
							padding: '24px',
						}}
					>
						<img
							src={url ?? placeholderImage}
							alt={title}
							css={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
						/>
					</div>
				), { noWrapper: true })
			}}
		>
			<Image src={url ?? placeholderImage} title={title} />
		</div>
	)
}
