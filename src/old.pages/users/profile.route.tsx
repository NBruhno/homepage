import type { NextPage } from 'next'

import { useTitle } from 'states/page'

import { Card } from 'components/Card'
import { FormChangePassword } from 'components/Forms/ChangePassword'
import { Page } from 'components/Layout/Page'

const Profile: NextPage = () => {
	useTitle('Profile')

	return (
		<Page>
			<div css={{ maxWidth: '420px', margin: '0 auto' }}>
				<Card shouldAnimate={false}>
					<FormChangePassword />
				</Card>
			</div>
		</Page>
	)
}

export default Profile
