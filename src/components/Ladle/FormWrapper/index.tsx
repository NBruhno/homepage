import type { ReactNode } from 'react'

import { useFormContext } from 'react-hook-form'

import { Card } from 'components/Card'

import { JsonWrapper } from '../JsonWrapper'

import { Title } from './Title'

export const FormWrapper = <T extends Record<string, number | string | undefined>>({ title, children }: { title: string, children: ReactNode }) => {
	const { formState, getValues } = useFormContext<T>()
	const values = getValues()

	return (
		<>
			<h1>{title}</h1>
			<div
				css={(theme) => ({
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					columnGap: '16px',
					[theme.mediaQueries.maxDesktop]: {
						gridTemplateColumns: 'auto',
					},
				})}
			>
				<Card contentCss={{ minHeight: '360px' }}>{children}</Card>
				<Card>
					<Title>Values</Title>
					<JsonWrapper data={values} name='fields' />
					<Title>Errors</Title>
					<JsonWrapper data={formState.errors} name='errors' />
				</Card>
			</div>
		</>
	)
}
