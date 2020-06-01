module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'airbnb',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	plugins: [
		'@typescript-eslint',
		'babel',
		'emotion',
		'filenames',
		'import',
		'jest',
		'jsx-a11y',
		'node',
		'promise',
		'react',
		'react-hooks',
		'standard',
	],
	env: {
		'browser': true,
		'jest/globals': true,
  },
  globals: {
    'React': 'writeable',
  },
	rules: {
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
    'space-infix-ops': 'off',
		'import/namespace': 'off',
		'import/named': 'off',
		'no-undef': 'off',

		'@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true }],
		'@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
		'@typescript-eslint/camelcase': ['error', { ignoreDestructuring: true }],
		'@typescript-eslint/indent': ['error', 'tab', {
			'SwitchCase': 1,
			'MemberExpression': 1,
			'FunctionExpression': { 'body': 1, 'parameters': 1 },
			'CallExpression': { 'arguments': 1 },
			'ignoredNodes': [
				'TaggedTemplateExpression[tag.name="sql"] > TemplateLiteral *',
			],
		}],
		'@typescript-eslint/member-delimiter-style': ['error', {
			'multiline': {
				'delimiter': 'comma',
				'requireLast': true,
			},
			'singleline': {
				'delimiter': 'comma',
				'requireLast': false,
			},
			'overrides': {
				'interface': {
					'multiline': {
						'delimiter': 'none',
						'requireLast': false,
					},
					'singleline': {
						'delimiter': 'semi',
						'requireLast': false,
					},
				},
			},
		}],
		'@typescript-eslint/prefer-function-type': ['error'],
		'@typescript-eslint/no-non-null-assertion': ['warn'],

		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-misused-new': 'off',
		'@typescript-eslint/prefer-interface': 'off',
		'@typescript-eslint/generic-type-naming': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',

		'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never' }],
		'semi': ['error', 'never'],
		'generator-star-spacing': ['error', 'both'],
		'arrow-parens': ['error', 'always'],
		'quote-props': ['error', 'as-needed'],
		'jsx-quotes': ['error', 'prefer-single'],
		'function-paren-newline': ['error', 'consistent'],
		'no-shadow': ['warn'],
		'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
		'quotes': ['error', 'single', { allowTemplateLiterals: true }],
		'no-implied-eval': ['error'],
		'no-restricted-syntax': ['error',
			{ selector: 'ForInStatement', message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.' },
			{ selector: 'LabeledStatement', message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.' },
			{ selector: 'WithStatement', message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.' },
		],
		'no-mixed-operators': [
			'error',
			{
				allowSamePrecedence: true,
				groups: [
					['==', '!=', '===', '!==', '>', '>=', '<', '<='],
					['&&', '||'],
					['in', 'instanceof'],
				],
			},
		],
		'indent': ['error', 'tab', {
			'SwitchCase': 1,
			'MemberExpression': 1,
			'FunctionExpression': { 'body': 1, 'parameters': 1 },
			'CallExpression': { 'arguments': 1 },
			'ignoredNodes': [
				'TaggedTemplateExpression[tag.name="sql"] > TemplateLiteral *',
			],
		}],
		'comma-dangle': ['error', {
			'arrays': 'always-multiline',
			'objects': 'always-multiline',
			'imports': 'always-multiline',
			'exports': 'always-multiline',
			'functions': 'always-multiline',
		}],
		'func-style': ['error', 'expression'],
		'no-unused-vars': 'off',
		'object-curly-spacing': ['error', 'always'],
		'object-curly-newline': ['error', { multiline: true, consistent: true }],
		'prefer-destructuring': ['error', {
			'VariableDeclarator': {
				'array': true,
				'object': true,
			},
			'AssignmentExpression': {
				'array': false,
				'object': false,
			},
		}],

		'no-tabs': 'off',
		'max-len': 'off',
		'consistent-return': 'off',
		'no-else-return': 'off',
		'dot-notation': 'off',
		'prefer-template': 'off',
		'no-plusplus': 'off',
		'default-case': 'off',
		'func-names': 'off',
		'no-confusing-arrow': 'off',
		'class-methods-use-this': 'off',
		'no-param-reassign': 'off',
		'lines-between-class-members': 'off',
		'no-await-in-loop': 'off',

		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-no-bind': ['error', {
			'ignoreRefs': false,
			'allowArrowFunctions': true,
			'allowBind': false,
		}],
		'react/jsx-curly-spacing': ['error', { when: 'never', allowMultiline: false }],

		'react/prefer-stateless-function': 'off',
		'react/sort-comp': 'off',
		'react/jsx-filename-extension': 'off',
		'react/no-array-index-key': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'react/destructuring-assignment': 'off',

		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': ['error', { 'devDependencies': true, 'optionalDependencies': false, 'peerDependencies': false }],
		'import/order': ['off', {
			'newlines-between': 'always-and-inside-groups',
			'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
		}],

		'jsx-a11y/label-has-for': 'off',
		'jsx-a11y/anchor-is-valid': 'off',

		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/jsx-props-no-spreading': 'off',

	},
}
