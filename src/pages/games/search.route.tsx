import type { NextPage } from 'next'

import { useSearchGames } from 'states/games'
import { useTitle } from 'states/page'

import { Form } from 'components/Form'
import { Input } from 'components/FormFields'
import { Page, PageContent } from 'components/Layout'

import { useTheme } from 'styled-components'
import { SearchList } from './Lists'

export type SearchGamesModel = {
	search: string
}

const Games: NextPage = () => {
	const { games, hasSearch } = useSearchGames()
	useTitle('Search for a game')
	const theme = useTheme()

	return (
		<Page>
			<PageContent maxWidth={700}>
				<div
					style={{
						marginTop: hasSearch ? 0 : '30vh',
						transition: `margin-top 135ms ${theme.animation.default}`,
					}}
				>
					<div>
						<Form
							name='searchGames'
							onSubmit={async () => undefined}
							shouldPersistStateOnSubmit
							shouldUpdateFieldsOnStateChange
							render={({ name }) => <Input label='Find a game' name={name('search')} showOptionalHint={false} />}
						/>
						<SearchList games={games ?? null} isLoading={!games && hasSearch} />
					</div>
				</div>
			</PageContent>
		</Page>
	)
}

export default Games
