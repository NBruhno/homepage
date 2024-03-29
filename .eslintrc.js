/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'airbnb',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:@next/next/recommended',
	],
	plugins: [
		'@typescript-eslint',
		'eslint-plugin-tsdoc',
		'@emotion',
		'filenames',
		'import',
		'jest',
		'jsx-a11y',
		'node',
		'promise',
		'react',
		'react-hooks',
	],
	env: {
		browser: true,
		'jest/globals': true,
	},
	globals: {
		React: 'writeable',
	},
	overrides: [
		/* ******************************************** */
		/* *********** TypeScript only rules ********** */
		/* ******************************************** */
		{
			parserOptions: {
				project: ['./tsconfig.json'],
			},
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/await-thenable': ['error'],
				'@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
				'@typescript-eslint/naming-convention': [
					'error',
					// {
					// 	selector: 'default',
					// 	format: ['strictCamelCase'],
					// },
					// {
					// 	selector: 'variable',
					// 	format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
					// },
					// {
					// 	selector: ['parameter', 'typeProperty'],
					// 	format: ['strictCamelCase', 'UPPER_CASE'],
					// 	leadingUnderscore: 'allow',
					// },
					// {
					// 	selector: 'objectLiteralProperty',
					// 	format: [],
					// 	leadingUnderscore: 'allow',
					// },
					// {
					// 	selector: ['enumMember', 'enum', 'typeAlias', 'interface', 'class', 'variable', 'typeParameter'],
					// 	format: ['StrictPascalCase'],
					// },
					{
						selector: ['variable', 'parameter', 'typeProperty'],
						types: ['boolean'],
						format: ['StrictPascalCase'],
						prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'disable', 'enable', 'show', 'allow', 'disallow'],
					},
				],
				'@typescript-eslint/no-base-to-string': ['error'],
				'@typescript-eslint/no-confusing-void-expression': ['off'],
				'@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
				'@typescript-eslint/no-for-in-array': ['error'],
				'@typescript-eslint/no-meaningless-void-operator': ['error'],
				'@typescript-eslint/no-misused-promises': ['error', {
					checksVoidReturn: {
						arguments: false,
						attributes: false,
					},
				}],
				'@typescript-eslint/no-redundant-type-constituents': ['error'],
				'@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
				'@typescript-eslint/no-unnecessary-condition': ['error'],
				'@typescript-eslint/no-unnecessary-type-arguments': ['error'],
				'@typescript-eslint/no-unnecessary-type-assertion': ['error'],
				'@typescript-eslint/no-unsafe-argument': ['error'],
				'@typescript-eslint/no-unsafe-assignment': ['error'],
				'@typescript-eslint/no-unsafe-call': ['error'],
				'@typescript-eslint/no-unsafe-member-access': ['error'],
				'@typescript-eslint/no-unsafe-return': ['error'],
				'@typescript-eslint/no-unused-vars': ['error'],
				'@typescript-eslint/no-var-requires': ['error'],
				'@typescript-eslint/prefer-includes': ['error'],
				'@typescript-eslint/prefer-nullish-coalescing': ['error'],
				'@typescript-eslint/prefer-optional-chain': ['error'],
				'@typescript-eslint/prefer-readonly-parameter-types': 'off',
				'@typescript-eslint/prefer-readonly': ['error'],
				'@typescript-eslint/prefer-reduce-type-parameter': ['error'],
				'@typescript-eslint/prefer-regexp-exec': ['error'],
				'@typescript-eslint/prefer-string-starts-ends-with': ['error'],
				'@typescript-eslint/require-array-sort-compare': ['error'],
				'@typescript-eslint/restrict-plus-operands': ['error'],
				'@typescript-eslint/restrict-template-expressions': ['error'],
				'@typescript-eslint/switch-exhaustiveness-check': ['error'],
				'@typescript-eslint/type-annotation-spacing': ['error'],
				'@typescript-eslint/unbound-method': ['error'],
			},
		},
	],
	rules: {
		/* ******************************************** */
		/* ************* TypeScript rules ************* */
		/* ******************************************** */

		'@typescript-eslint/adjacent-overload-signatures': ['error'],
		'@typescript-eslint/array-type': ['error', { default: 'generic' }],
		'@typescript-eslint/ban-ts-comment': ['error', {
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': 'allow-with-description',
			'ts-nocheck': 'allow-with-description',
			'ts-check': 'allow-with-description',
		}],
		'@typescript-eslint/ban-types': ['error'],
		'@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
		'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
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
		'@typescript-eslint/member-ordering': ['error'],
		'@typescript-eslint/method-signature-style': ['error'],
		'@typescript-eslint/no-confusing-non-null-assertion': ['error'],
		'@typescript-eslint/no-empty-interface': ['error'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-extra-non-null-assertion': ['error'],
		'@typescript-eslint/no-extraneous-class': ['error'],
		'@typescript-eslint/no-invalid-void-type': ['error'],
		'@typescript-eslint/no-misused-new': 'off',
		'@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],
		'@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
		'@typescript-eslint/no-non-null-assertion': ['warn'],
		'@typescript-eslint/no-shadow': ['warn'],
		'@typescript-eslint/no-this-alias': ['error'],
		'@typescript-eslint/no-unnecessary-type-constraint': ['error'],
		'@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
		'@typescript-eslint/prefer-as-const': ['error'],
		'@typescript-eslint/prefer-enum-initializers': ['error'],
		'@typescript-eslint/prefer-function-type': ['error'],
		'@typescript-eslint/prefer-interface': 'off',
		'@typescript-eslint/prefer-literal-enum-member': ['error'],
		'@typescript-eslint/prefer-namespace-keyword': ['error'],
		'@typescript-eslint/prefer-ts-expect-error': ['error'],
		'@typescript-eslint/triple-slash-reference': ['error'],
		'@typescript-eslint/unified-signatures': ['warn'],

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
		'no-void': ['error', { allowAsStatement: true }],
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
		'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-no-bind': ['error', {
			ignoreRefs: false,
			allowArrowFunctions: true,
			allowBind: false,
		}],
		'react/function-component-definition': ['error', {
			namedComponents: 'arrow-function',
			unnamedComponents: 'arrow-function',
		}],
		'react/jsx-no-useless-fragment': ['error', {
			allowExpressions: true,
		}],
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/no-array-index-key': 'off',
		'react/prefer-stateless-function': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 0,
		'react/sort-comp': 'off',
		'react/no-unknown-property': 'off',

		/* ******************************************** */
		/* ************ Other plugin rules ************ */
		/* ******************************************** */

		'import/extensions': 'off',
		'import/named': 'off',
		'import/namespace': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: false, peerDependencies: false }],
		'import/no-unresolved': 'off',
		'import/order': ['error', {
			groups: ['type', 'builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'object', 'index'],
			pathGroups: [
				// We want types to always be at the top of a file (including enums)
				{ pattern: 'types', group: 'type' },
				{ pattern: 'config.client', group: 'internal', position: 'after' },
				{ pattern: 'config.server', group: 'internal', position: 'after' },
				{ pattern: 'pages/**', group: 'internal', position: 'after' },
				{ pattern: 'states/**', group: 'internal', position: 'after' },
				{ pattern: 'styles/**', group: 'internal', position: 'after' },
				{ pattern: 'validation/**', group: 'internal', position: 'after' },
				{ pattern: 'lib/**', group: 'internal', position: 'after' },
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
