import {
	FloatingFocusManager,
	FloatingPortal,
	useDismiss,
	useFloating,
	useInteractions,
	useRole,
	useTransitionStyles,
} from '@floating-ui/react'
import type { ComponentPropsWithoutRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { useModal, useResponsive } from 'states/page'
import { Card } from './Card'
import { Container } from './Container'
import { Shade } from './Shade'
import { Wrapper } from './Wrapper'

export const Modal = (props: ComponentPropsWithoutRef<'div'>) => {
	const { allowClosure, show, content, onCloseModal, hasNoWrapper = false } = useModal()
	const { isMobile } = useResponsive()

	const { refs, context } = useFloating({
		open: show,
	})

	const role = useRole(context, { role: 'dialog' })
	const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })

	const { getFloatingProps } = useInteractions([role, dismiss])

	const { isMounted, styles } = useTransitionStyles(context, {
		duration: 200,
		initial: {
			opacity: isMobile ? 1 : 0,
			transform: isMobile ? 'scaleY(3)' : 'scale(0.3)',
		},
	})

	return (
		<FloatingPortal>
			<Shade show={show} onClick={allowClosure ? onCloseModal : undefined}></Shade>
			{isMounted && (
				<RemoveScroll>
					<FloatingFocusManager context={context}>
						<Wrapper>
							<Container
								style={styles}
								ref={refs.setFloating}
								show={show}
								hasNoWrapper={hasNoWrapper}
								{...getFloatingProps()}
							>
								{hasNoWrapper ? content : <Card {...props}>{content}</Card>}
							</Container>
						</Wrapper>
					</FloatingFocusManager>
				</RemoveScroll>
			)}
		</FloatingPortal>
	)
}
