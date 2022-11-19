import type { MouseEvent } from 'react'
import type { Promisable } from 'type-fest'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { useState } from 'react'

import { delay } from 'lib/delay'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { LabelContainer } from '../LabelContainer'
import { RowLabel } from '../RowLabel'

import { ToggleComponent } from './ToggleComponent'

type Props = {
	label: string,
	isChecked: boolean,
	onClick: (event: MouseEvent<HTMLButtonElement>) => Promisable<any>,

	minDelay?: number,
	hint?: string,
	isDisabled?: boolean,
	isFullWidth?: boolean,
	isLoading?: boolean,
}

export const ToggleButton = ({ isFullWidth = true, label, hint, isDisabled = false, isChecked = false, onClick, minDelay = 0, isLoading: isLoadingManually }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const { isFocusVisible, focusProps } = useFocusRing({ within: true })
	const { hoverProps, isHovered } = useHover({})

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		event.preventDefault()

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const result: any = onClick(event)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (minDelay || (result && typeof result.then === 'function')) {
			setIsLoading(true)
			const promiseHandler = () => setIsLoading(false)
			Promise.all([result, delay(minDelay)]).then(promiseHandler, promiseHandler)
		}
	}

	return (
		<FieldWrapper isFullWidth={isFullWidth} isSlim>
			<RowLabel isSlim>
				<div {...focusProps} {...hoverProps}>
					<ToggleComponent
						isChecked={isChecked}
						isDisabled={isDisabled}
						isFocusVisible={isFocusVisible}
						isHovered={isHovered}
						isLoading={isLoadingManually ?? isLoading}
						label={label}
						onClick={(event) => handleClick(event)}
					/>
				</div>
				<LabelContainer css={{ margin: '0 0 0 6px' }}>
					<span>{label}</span>
					{hint && <Hint>{hint}</Hint>}
				</LabelContainer>
			</RowLabel>
		</FieldWrapper>
	)
}
