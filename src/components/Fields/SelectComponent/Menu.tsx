import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useSpring, animated } from 'react-spring'

const Menu = ({ isOpen, hasError, forwardRef, ...rest }) => {
	const theme: Theme = useTheme()

	return (
		<animated.div
			ref={forwardRef}
			css={css`
				background: ${theme.color.white};
				position: absolute;
				width: calc(100% - 14px);
				left: 0;
				right: 0;
				z-index: 4;
				border-radius: 4px;
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
				padding: 10px 6px;
				overflow: hidden;
			`}
			style={useSpring({
				config: {
					duration: 100,
				},
				opacity: isOpen ? 1 : 0,
				height: isOpen ? 'unset' : 0,
				top: isOpen ? '48px' : '42px',
			})}
			{...rest}
		/>
	)
}

export default Menu
