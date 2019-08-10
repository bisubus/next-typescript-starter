'use strict';

module.exports = {
	extends: [
		'xo',
		'xo-react',
		'xo-typescript'
	],
	overrides: [
		{
			files: ['*.js', '*.jsx'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'prefer-object-spread': 'off'
			}
		},
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				// Already checked by TypeScript
				'getter-return': 'off',
				'no-dupe-args': 'off',
				'no-dupe-keys': 'off',
				'no-unreachable': 'off',
				'valid-typeof': 'off',
				'no-const-assign': 'off',
				'no-new-symbol': 'off',
				'no-this-before-super': 'off',
				'no-undef': 'off',
				'no-dupe-class-members': 'off',
				'no-redeclare': 'off'
			}
		}
	],
	rules: {
		// @typescript-eslint
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/indent': ['error', 'tab', {
			MemberExpression: 0,
			SwitchCase: 1
		}],
		'@typescript-eslint/no-unused-vars': ['error', {
			vars: 'all',
			args: 'after-used',
			ignoreRestSiblings: true,
			argsIgnorePattern: '^_',
			caughtErrors: 'all',
			caughtErrorsIgnorePattern: '^_'
		}],
		'@typescript-eslint/restrict-plus-operands': 'off',

		// react
		'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],

		// Core
		'arrow-parens': 'off',
		'capitalized-comments': 'off',
		'generator-star-spacing': ['error', { before: false, after: true }],
		'no-multiple-empty-lines': ['error', { max: 2 }],
		'object-curly-spacing': ['error', 'always'],
		'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
		'yield-star-spacing': ['error', 'after']
	}
};
