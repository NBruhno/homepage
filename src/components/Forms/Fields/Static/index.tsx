import { ColumnLabel } from '../ColumnLabel'
import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { LabelContainer } from '../LabelContainer'

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

export const Static = ({ label, hint, value, rows = 1, maxRows = 8, id: manualId, fullWidth }: Props) => {
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
