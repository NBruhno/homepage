import styled from 'styles/theme'

import RowLabel from '../RowLabel'

export default styled(RowLabel)<{ disabled: boolean }>(({ disabled, theme }) => `
	color: ${disabled ? theme.color.gray : theme.color.grayDark};
	padding-bottom: 12px;
	margin-bottom: 0;
`)
