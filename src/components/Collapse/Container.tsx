import { css } from '@emotion/core'

export const transitionTime = 0.3

const Container: React.FC<{ isAnimated?: boolean, fill?: boolean }> = ({ isAnimated, fill, ...rest }) => (
	<div
		css={[
			css`
				transition: ${isAnimated ? `height ${transitionTime}s` : 'none'};
				overflow: hidden;
			`,
			fill ? css`
				flex-grow: 1;
				display: flex;
				flex-direction: column;
			` : undefined,
		]}
		{...rest}
	/>
)

export default Container
