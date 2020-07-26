import React from 'react'
import { times } from 'lodash-es'

import { Fill } from './Fill'
import { Line } from './Line'

const lineLengths = [1, 0.5, 0.8, 0.7]

type Props = {
	lines: number,
	width: number | string,
}

export const Internal = ({ lines = 1, width = '80%' }: Props) => {
	const widthString = typeof width === 'number' ? `${width}px` : width

	return (
		<>
			{times(lines, (idx) => {
				const factor = lineLengths[idx % lineLengths.length]
				return (
					<Line key={idx}>
						&#8203;
						<Fill width={factor === 1 ? widthString : `calc(${widthString} * ${factor})`} />
					</Line>
				)
			})}
		</>
	)
}
