import type { NextPage } from 'next'

import Head from 'next/head'
import { useMemo } from 'react'

import { useGlobalState } from 'states/global'

import { PopularGames } from 'containers/games/Lists'

import { ButtonBorder } from 'components/Buttons'
import { Page, PageContent } from 'components/Layout'
import { Tooltip } from 'components/Tooltip'

const Games: NextPage = () => {
	const [{ skips, numberOfPages, take, isLimitReached }, setState] = useGlobalState('popularGames')

	return (
		<>
			<Head>
				<title>Popular games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<h2>Popular games</h2>
					{useMemo(() => {
						const pagesToRender = []
						for (let index = 0; index < numberOfPages; index++) {
							pagesToRender.push(<PopularGames skip={skips[index]} key={index} />)
						}
						return pagesToRender
					}, [numberOfPages])}
					<div css={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
						<Tooltip tip="That's all the popular games" show={isLimitReached}>
							<ButtonBorder
								label='Show more'
								disabled={isLimitReached}
								onClick={() => {
									if (!isLimitReached) {
										setState({
											isLimitReached,
											numberOfPages: numberOfPages + 1,
											skips: [...skips, numberOfPages * take],
											take,
										})
									}
								}}
							/>
						</Tooltip>
					</div>
				</PageContent>
			</Page>
		</>
	)
}

export default Games
