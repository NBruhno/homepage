import { Navigation } from '.'

export default {
	title: 'Navigation',
	decorators: [(story: any) => <div>{story()}</div>],
}

export const Default = () => (
	<>
		<Navigation />
	</>
)
