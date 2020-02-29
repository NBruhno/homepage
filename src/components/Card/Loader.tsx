import { css } from '@emotion/core'

import ActivityIndicator from 'components/ActivityIndicator'

const Loader: React.FC = (props) => (
	<div
		css={css`
			min-height: 100px;
			min-width: 100px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		`}
		{...props}
	>
		<ActivityIndicator />
	</div>
)

export default Loader
