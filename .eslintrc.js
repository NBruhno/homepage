module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'airbnb',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	plugins: [
		'@typescript-eslint',
		'eslint-plugin-tsdoc',
		'babel',
		'@emotion',
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
	overrides: [
		{
			files: '*.mdx',
			extends: 'plugin:mdx/recommended',
			rules: {
				'react/jsx-indent': 'off',
			},
		},
	],
	env: {
		browser: true,
		'jest/globals': true,
	},
	globals: {
		React: 'writeable',
	},
	rules: {
		/* ******************************************** */
		/* ************* TypeScript rules ************* */
		/* ******************************************** */

		'@typescript-eslint/array-type': ['error', { default: 'generic' }],
		'@typescript-eslint/ban-ts-comment': ['error', {
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': 'allow-with-description',
			'ts-nocheck': 'allow-with-description',
			'ts-check': 'allow-with-description',
		}],
		'@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
		'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/indent': ['error', 'tab', {
			SwitchCase: 1,
			MemberExpression: 1,
			FunctionExpression: { body: 1, parameters: 1 },
			CallExpression: { arguments: 1 },
			ignoredNodes: [
				'TaggedTemplateExpression[tag.name="sql"] > TemplateLiteral *',
			],
		}],
		'@typescript-eslint/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'comma',
				requireLast: true,
			},
			singleline: {
				delimiter: 'comma',
				requireLast: false,
			},
			overrides: {
				interface: {
					multiline: {
						delimiter: 'none',
						requireLast: false,
					},
					singleline: {
						delimiter: 'semi',
						requireLast: false,
					},
				},
			},
		}],
		'@typescript-eslint/method-signature-style': ['error'],
		'@typescript-eslint/no-empty-interface': ['error'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-extraneous-class': ['error'],
		'@typescript-eslint/no-misused-new': 'off',
		'@typescript-eslint/no-non-null-assertion': ['warn'],
		'@typescript-eslint/no-shadow': ['warn'],
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
		'@typescript-eslint/prefer-function-type': ['error'],
		'@typescript-eslint/prefer-interface': 'off',

		/* ******************************************** */
		/* ************* JavaScript rules ************* */
		/* ******************************************** */

		'arrow-parens': ['error', 'always'],
		'class-methods-use-this': 'off',
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			exports: 'always-multiline',
			functions: 'always-multiline',
			imports: 'always-multiline',
			objects: 'always-multiline',
		}],
		'consistent-return': 'off',
		'default-case': 'off',
		'dot-notation': 'off',
		'func-names': 'off',
		'func-style': ['error', 'expression'],
		'function-paren-newline': ['error', 'consistent'],
		'generator-star-spacing': ['error', 'both'],
		indent: ['error', 'tab', {
			CallExpression: { arguments: 1 },
			FunctionExpression: { body: 1, parameters: 1 },
			MemberExpression: 1,
			SwitchCase: 1,
			ignoredNodes: [
				'TaggedTemplateExpression[tag.name="sql"] > TemplateLiteral *',
			],
		}],
		'jsx-quotes': ['error', 'prefer-single'],
		'lines-between-class-members': 'off',
		'max-len': 'off',
		'no-await-in-loop': 'off',
		'no-confusing-arrow': 'off',
		'no-console': ['error'],
		'no-else-return': 'off',
		'no-implied-eval': ['error'],
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
		'no-param-reassign': 'off',
		'no-plusplus': 'off',
		'no-shadow': 'off',
		'no-tabs': 'off',
		'no-undef': 'off',
		'no-unused-vars': 'off',
		'no-use-before-define': ['error', { classes: false, functions: false, variables: false }],
		'object-curly-newline': ['error', { consistent: true, multiline: true }],
		'object-curly-spacing': ['error', 'always'],
		'prefer-destructuring': ['error', {
			AssignmentExpression: {
				array: false,
				object: false,
			},
			VariableDeclarator: {
				array: true,
				object: true,
			},
		}],
		'prefer-template': 'off',
		'quote-props': ['error', 'as-needed'],
		'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
		'space-infix-ops': 'off',
		semi: ['error', 'never'],
		quotes: ['error', 'single', { allowTemplateLiterals: true }],

		/* ******************************************** */
		/* **************** React rules *************** */
		/* ******************************************** */

		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react/destructuring-assignment': 'off',
		'react/jsx-curly-spacing': ['error', { when: 'never', allowMultiline: false }],
		'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.mdx'] }],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-no-bind': ['error', {
			ignoreRefs: false,
			allowArrowFunctions: true,
			allowBind: false,
		}],
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/no-array-index-key': 'off',
		'react/prefer-stateless-function': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 0,
		'react/sort-comp': 'off',

		/* ******************************************** */
		/* ************ Other plugin rules ************ */
		/* ******************************************** */

		'import/extensions': 'off',
		'import/named': 'off',
		'import/namespace': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: false, peerDependencies: false }],
		'import/no-unresolved': 'off',
		'import/order': ['error', {
			groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
			pathGroups: [
				{ pattern: 'config.client', group: 'internal', position: 'after' },
				{ pattern: 'config.server', group: 'internal', position: 'after' },
				{ pattern: 'types/**', group: 'internal', position: 'after' },
				{ pattern: 'states/**', group: 'internal', position: 'after' },
				{ pattern: 'styles/**', group: 'internal', position: 'after' },
				{ pattern: 'lib/**', group: 'internal', position: 'after' },
				{ pattern: 'containers/**', group: 'internal', position: 'after' },
				{ pattern: 'components/**', group: 'internal', position: 'after' },
			],
			pathGroupsExcludedImportTypes: ['builtin'],
			alphabetize: {
				caseInsensitive: true,
				order: 'asc',
			},
			'newlines-between': 'always',
		}],
		'import/prefer-default-export': 'off',

		'tsdoc/syntax': 'warn',

		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/label-has-for': 'off',

		'@emotion/syntax-preference': [2, 'object'],
	},
}
