import { css } from '@emotion/core'

const Checkbox: React.FC<{ id?: string, type?: string, disabled?: boolean, checked?: boolean }> = (props) => (
	<input
		css={css`
			position: absolute;
			opacity: 0;
			flex-shrink: 0;
		`}
		{...props}
	/>
)

export default Checkbox
