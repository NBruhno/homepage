import type { NextPage } from 'next'

import Head from 'next/head'
import { useMemo } from 'react'

import { useGlobalState } from 'states/globalState'

import { PopularGames } from 'containers/games/Lists'

import { ButtonBorder } from 'components/Buttons'
import { Page, PageContent } from 'components/Layout'
import { Tooltip } from 'components/Tooltip'

const Games: NextPage = () => {
	const [{ afters, numberOfPages }, setState] = useGlobalState('popularGames')
	const disablePagination = numberOfPages >= 4

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
							pagesToRender.push(<PopularGames after={afters[index]} key={index} />)
						}
						return pagesToRender
					}, [numberOfPages])}
					<div css={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
						<Tooltip tip="That's all the popular games" show={disablePagination}>
							<ButtonBorder
								label='Show more'
								disabled={disablePagination}
								onClick={() => {
									if (!disablePagination) {
										setState({ afters, numberOfPages: numberOfPages + 1 })
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
