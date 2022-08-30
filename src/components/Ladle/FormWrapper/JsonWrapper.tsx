import { useTheme } from '@emotion/react'
import { ObjectInspector } from 'react-inspector'

type Props = {
	data: Record<string, any>,
	name?: string,
}

export const JsonWrapper = ({ data, name }: Props) => {
	const { isDarkTheme } = useTheme()

	return (
		<div
			css={(theme) => ({
				minHeight: '100px',
				padding: '12px 16px',
				backgroundColor: theme.isDarkTheme ? 'rgb(36, 36, 36)' : 'white',
				color: theme.color.text,
				borderRadius: '12px',
				border: `1px solid ${theme.color.border}`,
				marginTop: '8px',
			})}
		>
			<ObjectInspector data={data} name={name} expandLevel={2} theme={isDarkTheme ? 'chromeDark' : 'chromeLight'} />
		</div>
	)
}
