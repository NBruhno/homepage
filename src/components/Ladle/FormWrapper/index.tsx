import type { ReactNode } from 'react'

import { useFormContext } from 'react-hook-form'

import { Card } from 'components/Card'

import { JsonWrapper } from '../JsonWrapper'

import { Container } from './Container'
import { Title } from './Title'

export const FormWrapper = <T extends Record<string, number | string | undefined>>({ title, children }: { title: string; children: ReactNode }) => {
	const { formState, getValues } = useFormContext<T>()
	const values = getValues()

	return (
		<>
			<h1>{title}</h1>
			<Container>
				<Card style={{ minHeight: '360px' }}>{children}</Card>
				<Card>
					<Title>Values</Title>
					<JsonWrapper data={values} name='fields' />
					<Title>Errors</Title>
					<JsonWrapper data={formState.errors} name='errors' />
				</Card>
			</Container>
		</>
	)
}
