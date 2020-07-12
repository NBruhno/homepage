import { Shade } from '../Shade'

import { Container } from './Container'

export const Footer = (props: React.ComponentProps<'footer'>) => (
	<Container {...props}>
		This is a footer
		<Shade />
	</Container>
)
