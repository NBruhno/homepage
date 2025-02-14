import type { ComponentPropsWithoutRef } from 'react'

import { styled } from 'styled-components'

import { Spinner } from 'components/Spinner'

export const Loader = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100px;
	min-width: 100px;
`

export const LoaderOld = (props: ComponentPropsWithoutRef<'div'>) => (
	<Loader {...props}>
		<Spinner size={32} />
	</Loader>
)
