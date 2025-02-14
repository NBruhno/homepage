import { ObjectInspector } from 'react-inspector'
import { useTheme } from 'styled-components'

import { Container } from './Container'

type Props = {
	data: Record<string, any>
	name?: string
}

export const JsonWrapper = ({ data, name }: Props) => {
	const { isDarkTheme } = useTheme()

	return (
		<Container>
			<ObjectInspector data={data} name={name} expandLevel={2} theme={isDarkTheme ? 'chromeDark' : 'chromeLight'} />
		</Container>
	)
}
