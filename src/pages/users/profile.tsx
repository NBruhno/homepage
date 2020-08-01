import { NextPage } from 'next'
import Head from 'next/head'

import { Page } from 'components/Pages/Layout/Page'
import { Card } from 'components/Card'
import { FormChangePassword } from 'components/Forms/ChangePassword'

const Profile: NextPage = () => (
	<Page>
		<Head>
			<title>Profile • Bruhno</title>
		</Head>
		<div css={{ maxWidth: '420px', margin: '0 auto' }}>
			<Card shouldAnimate={false}>
				<FormChangePassword />
			</Card>
		</div>
	</Page>
)

export default Profile
