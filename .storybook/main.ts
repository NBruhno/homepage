export default {
	stories: ['../src/**/*.stories.@(js|ts|tsx|mdx)'],
	addons: [
		'@storybook/addon-backgrounds',
		'@storybook/addon-docs',
		'@storybook/addon-toolbars',
		'@storybook/addon-viewport',
		'storybook-dark-mode',
	],
	reactOptions: {
		fastRefresh: true,
	}
}
