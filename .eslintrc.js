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
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-unused-vars': ['error', {
			vars: 'all',
			args: 'after-used',
			ignoreRestSiblings: true,
			argsIgnorePattern: '^_',
			caughtErrors: 'all',
			caughtErrorsIgnorePattern: '^_'
		}],
		'@typescript-eslint/restrict-plus-operands': 'off',
		'capitalized-comments': 'off',
		'no-multiple-empty-lines': ['error', { max: 2 }],
		'object-curly-spacing': ['error', 'always'],
		'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
		'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }]
	}
};
