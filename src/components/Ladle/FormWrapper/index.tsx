import type { ReactNode } from 'react'

import isEmpty from 'lodash/isEmpty'
import { useFormContext } from 'react-hook-form'

import { Card } from 'components/Card'

import { JsonWrapper } from './JsonWrapper'
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
					<JsonWrapper>
						{!isEmpty(values) && JSON.stringify(values, null, 2)}
					</JsonWrapper>
					<Title>Errors</Title>
					<JsonWrapper>
						{!isEmpty(formState.errors) && (
							<>
								{'{\n'}
								{Object.entries(formState.errors).map(([key, value]: [key: string, value: { message: string } | undefined]) => (
									`  "${key}": ${value?.message ? `"${value.message}"` : 'undefined'},\n`
								))}
								{'}'}
							</>
						)}
					</JsonWrapper>
				</Card>
			</div>
		</>
	)
}
