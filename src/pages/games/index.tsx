import { NextPage } from 'next'
import Head from 'next/head'
import { FormSpy } from 'react-final-form'

import { useGames } from 'reducers/games'

import { ButtonToggle } from 'components/Buttons'
import { Form } from 'components/Forms'
import { GameList } from 'components/Pages/Games/List'
import { Input } from 'components/Forms/Fields/Input'
import { Page, PageContent } from 'components/Pages/Layout'

enum Lists {
	Popular = 'popular',
	Search = 'search',
	Following = 'following',
}

const Games: NextPage = () => {
	const { games, following, popular, currentList, setCurrentList, error, follow, unfollow } = useGames()

	return (
		<>
			<Head>
				<title>Games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<div>
						<Form form='gamesForm' onSubmit={() => null} persistStateOnSubmit>
							<Input label='Find a game' name='search' />
							<FormSpy
								subscription={{ submitSucceeded: true, dirtySinceLastSubmit: true }}
								onChange={({ dirtySinceLastSubmit, submitSucceeded }) => {
									if (submitSucceeded && !dirtySinceLastSubmit) setCurrentList(Lists.Search)
								}}
							/>
						</Form>
						<div css={(theme: Theme) => ({ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '24px', marginBottom: '18px', [theme.mediaQueries.maxMobile]: { gridGap: '12px' } })}>
							<ButtonToggle label='Popular' active={currentList === Lists.Popular} onClick={() => setCurrentList(Lists.Popular)} />
							<ButtonToggle label='Following' active={currentList === Lists.Following} onClick={() => setCurrentList(Lists.Following)} />
							<ButtonToggle label='Search' active={currentList === Lists.Search} onClick={() => setCurrentList(Lists.Search)} />
						</div>
						{currentList === Lists.Popular && <GameList games={popular} error={error} onFollow={follow} onUnfollow={unfollow} />}
						{currentList === Lists.Following && <GameList games={following} error={error} onFollow={follow} onUnfollow={unfollow} emptyMessage='You are not following any games' />}
						{currentList === Lists.Search && <GameList games={games} error={error} onFollow={follow} onUnfollow={unfollow} />}
					</div>
				</PageContent>
			</Page>
		</>
	)
}

export default Games
