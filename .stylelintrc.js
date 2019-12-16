module.exports = {
	processors: [['stylelint-processor-styled-components', {
		parserPlugins: [
			'tsx',
			'jsx',
			'objectRestSpread',
			['decorators', { decoratorsBeforeExport: true }],
			'classProperties',
			'exportExtensions',
			'asyncGenerators',
			'functionBind',
			'functionSent',
			'dynamicImport',
			'optionalCatchBinding',
			'optionalChaining',
			'exportDefaultFrom'
		  ]
	}]],
	extends: [
		'stylelint-config-recommended',
		'stylelint-config-styled-components',
	],
	rules: {
		'indentation': ['tab'],
		'declaration-empty-line-before': null,
		'color-hex-case': ['upper'],
		'selector-pseudo-element-colon-notation': ['single'],

		// Rules that does not play well with styled-components
		'value-list-max-empty-lines': null,
		'declaration-colon-newline-after': null,
		'block-no-empty': null,
		'selector-type-no-unknown': [true, {
			ignoreTypes: /^-styled-mixin/,
		}],
		'comment-empty-line-before': null,
	},
}
