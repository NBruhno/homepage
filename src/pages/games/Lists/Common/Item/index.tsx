import type { GameSimpleExtended } from 'types'

import { useHover } from '@react-aria/interactions'

import { Placeholder } from 'components/Placeholder'

import { Cover } from '../../../Cover'
import { dateOrYear } from '../../../dateOrYear'
import { Status } from '../Status'

import { Container } from './Container'
import { Subtitle } from './Subtitle'
import { Title } from './Title'

type Props = Pick<GameSimpleExtended, 'cover' | 'coverProps' | 'id' | 'name' | 'status'> & {
	index?: number,
	isLoading: boolean,
	releaseDate: string | null,
	isPriority?: boolean,
}

export const Item = ({ id, name, releaseDate, cover, coverProps, status, isPriority, isLoading, index = 0 }: Props) => {
	const { isHovered, hoverProps } = useHover({})

	return (
		<Container href={`/games/${id}`} isLoading={isLoading} {...hoverProps}>
			<Cover coverUrl={cover} isPriority={isPriority} imageProps={coverProps ?? undefined} isShineVisible={isHovered} />
			<div css={{ padding: '12px' }}>
				<Title>
					<Placeholder isLoading={isLoading} width={index % 2 === 0 ? 100 : 90}>
						{name}
					</Placeholder>
				</Title>
				<Subtitle>
					<Placeholder isLoading={isLoading} width={index % 3 === 0 ? 90 : 80}>
						{dateOrYear(releaseDate)}
					</Placeholder>
				</Subtitle>
				<div>
					{status && (
						<Status>{status}</Status>
					)}
				</div>
			</div>
		</Container>
	)
}
