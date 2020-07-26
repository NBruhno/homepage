import Link from 'next/link'

import { Card } from 'components/Card'

import { NavLink } from '../NavLink'

import { Container } from './Container'
import { useAuth } from 'reducers/auth'

type Props = & React.ComponentProps<'div'>

export const AuthGuard = (props: Props) => {
	const { user } = useAuth()

	if (user.isStateKnown && !user.accessToken) {
		return (
			<Container css={{ display: 'flex', padding: '24px' }}>
				<Card {...props} css={{ textAlign: 'center', maxWidth: '550px', maxHeight: '140px', margin: '30vh auto 0' }}>
					<h3 css={{ margin: '0 0 24px' }}>You need to be logged in to access this resource.</h3>
					<Link href='/login' passHref>
						<NavLink css={{ margin: '0 auto', width: '47px' }}>Sign in</NavLink>
					</Link>
				</Card>
			</Container>
		)
	}

	return null
}
