import type { NextPage } from 'next'

import { useRouter } from 'next/router'

import { usePopularGames } from 'states/games'
import { useLoading, useTitle } from 'states/page'

import { ButtonBorder } from 'components/Buttons'
import { Page, PageContent } from 'components/Layout'
import { Tooltip } from 'components/Tooltip'

import { PopularGames } from './Lists'

const Games: NextPage = () => {
	const { games, isLoading, setSize, size, isLimitReached } = usePopularGames()
	useTitle('Popular games')
	useLoading(false)
	const router = useRouter()

	return (
		<Page>
			<PageContent maxWidth={700}>
				<h2>Popular games</h2>
				{games ? games.map(({ games }, index) => <PopularGames games={games} isLoading={isLoading} key={index} />) : null}
				<div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
					<Tooltip
						tip="That's all the popular games"
						show={isLimitReached}
						render={(props) => (
							<ButtonBorder
								{...props}
								label='Show more'
								isDisabled={isLimitReached}
								onClick={async () => {
									await setSize(size + 1)
									await router.push({ query: { pages: size + 1 } }, undefined, { shallow: true })
								}}
							/>
						)}
					></Tooltip>
				</div>
			</PageContent>
		</Page>
	)
}

export default Games
