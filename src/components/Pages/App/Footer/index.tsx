import { Container } from './Container'
import { Link } from './Link'

export const Footer = (props: React.ComponentProps<'footer'>) => (
	<Container {...props}>
		<Link href='mailto: mail@bruhno.com'>Email</Link>
		<span css={{ opacity: 0.7 }}> • </span>
		<Link href='https://www.linkedin.com/in/bruhno/'>LinkedIn</Link>
		<div css={{ opacity: 0.7 }}>
			<small>
				© 2010-{new Date().toLocaleString('en-DK', { year: 'numeric' })} Bruhno, All rights reserved.
			</small>
		</div>
	</Container>
)
