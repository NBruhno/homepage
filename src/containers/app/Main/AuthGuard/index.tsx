import { useResponsive } from 'states/responsive'

import { Card } from 'components/Card'

import { Container } from './Container'
import { GuardShade } from './GuardShade'

type Props = {
	show?: boolean,
	allowClosure?: boolean,
} & React.ComponentProps<'div'>

export const AuthGuard = ({ show = true, children, allowClosure, ...rest }: Props) => {
	const { showLogin, updateResponsive } = useResponsive()

	return (
		<>
			<GuardShade show={show} onClick={allowClosure ? () => updateResponsive({ showLogin: !showLogin }) : undefined} />
			<Container show={show}>
				<Card {...rest} css={{ textAlign: 'center', width: '100%' }} shouldAnimate={false}>
					{children}
				</Card>
			</Container>
		</>
	)
}
