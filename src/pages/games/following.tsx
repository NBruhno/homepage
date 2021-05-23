import type { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useGlobalState } from 'states/globalState'

import { FollowingGames } from 'containers/games/Lists'

import { ButtonBorder } from 'components/Buttons'
import { Page, PageContent } from 'components/Layout'
import { Tooltip } from 'components/Tooltip'

const Games: NextPage = () => {
	const [{ afters, numberOfPages }, setState] = useGlobalState('followingGames')
	const { query } = useRouter()
	const disablePagination = afters[afters.length] === undefined
	return (
		<>
			<Head>
				<title>Followed games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<h2>Followed games</h2>
					{useMemo(() => {
						const pagesToRender = []
						for (let index = 0; index < numberOfPages; index++) {
							pagesToRender.push(<FollowingGames after={afters[index]} key={index} />)
						}
						return pagesToRender
					}, [numberOfPages])}
					{query.user && (
						<div css={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
							<Tooltip tip="That's all of your followed games" show={disablePagination}>
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
					)}
				</PageContent>
			</Page>
		</>
	)
}

export default Games
