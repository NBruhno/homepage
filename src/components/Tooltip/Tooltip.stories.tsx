import { Tooltip, Location } from '.'

export default {
	title: 'Tooltip',
	decorators: [(story: any) => <div css={{ padding: '72px 12px', textAlign: 'center' }}>{story()}</div>],
}

export const Top = () => (
	<div css={(theme: Theme) => ({ display: 'inline-block', color: theme.color.text })}>
		<Tooltip tip='This is a tooltip'>
			<span>Hover over me</span>
		</Tooltip>
	</div>
)

export const Right = () => (
	<div css={(theme: Theme) => ({ display: 'inline-block', color: theme.color.text })}>
		<Tooltip tip='This is a tooltip' location={Location.Right}>
			<span>Hover over me</span>
		</Tooltip>
	</div>
)

export const Bottom = () => (
	<div css={(theme: Theme) => ({ display: 'inline-block', color: theme.color.text })}>
		<Tooltip tip='This is a tooltip' location={Location.Bottom}>
			<span>Hover over me</span>
		</Tooltip>
	</div>
)

export const Left = () => (
	<div css={(theme: Theme) => ({ display: 'inline-block', color: theme.color.text })}>
		<Tooltip tip='This is a tooltip' location={Location.Left}>
			<span>Hover over me</span>
		</Tooltip>
	</div>
)

export const LotsOfText = () => (
	<div css={(theme: Theme) => ({ display: 'inline-block', color: theme.color.text })}>
		<Tooltip
			tip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
			location={Location.Bottom}
		>
			<span>Hover over me</span>
		</Tooltip>
	</div>
)

export const Jsx = () => (
	<div css={(theme: Theme) => ({ display: 'inline-block', color: theme.color.text })}>
		<Tooltip
			tip={(
				<>
					<h3 css={(theme: Theme) => ({ margin: '6px 0', color: theme.color.primary })}>This is HTML</h3>
					Ain&apos;t that nice
				</>
			)}
		>
			<span>Hover over me</span>
		</Tooltip>
	</div>
)
