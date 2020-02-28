import LabelContainer from '../LabelContainer'
import FieldWrapper from '../FieldWrapper'
import ColumnLabel from '../ColumnLabel'
import Hint from '../Hint'

import Textarea from './Textarea'

type Props = {
	label: string,
	id?: string,
	hint?: string,
	rows?: number,
	value?: string,
	maxRows?: number,
	fullWidth?: boolean,
}

export const StaticComponent = ({ label, hint, value, rows = 1, maxRows, id: manualId, fullWidth }: Props) => {
	const uniqueId = `${label}`
	const formattedValue = value === null || value === undefined
		? '–'
		: value

	return (
		<FieldWrapper fullWidth={fullWidth} minWidth={170}>
			<ColumnLabel htmlFor={manualId || uniqueId}>
				<LabelContainer>
					<div>{label}</div>
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

export default StaticComponent
