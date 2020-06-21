import { LabelContainer } from '../LabelContainer'
import { FieldWrapper } from '../FieldWrapper'
import { ColumnLabel } from '../ColumnLabel'
import { Hint } from '../Hint'

import { Textarea } from './Textarea'

type Props = {
	label: string,

	fullWidth?: boolean,
	hint?: string,
	id?: string,
	maxRows?: number,
	rows?: number,
	value?: string,
}

export const StaticComponent = ({ label, hint, value, rows = 1, maxRows, id: manualId, fullWidth }: Props) => {
	const uniqueId = `${label}`
	const formattedValue = value === null || value === undefined
		? '–'
		: value

	return (
		<FieldWrapper fullWidth={fullWidth} minWidth={170}>
			<ColumnLabel>
				<LabelContainer>
					<label htmlFor={manualId || uniqueId}>{label}</label>
					{hint && <Hint>{hint}</Hint>}
				</LabelContainer>
				<Textarea
					id={manualId || uniqueId}
					value={formattedValue}
					maxRows={maxRows}
					rows={rows}
					disabled
					async
				/>
			</ColumnLabel>
		</FieldWrapper>
	)
}
