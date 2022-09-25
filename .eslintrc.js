module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: 'standard-with-typescript',
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        project: ['./tsconfig.json'],
        sourceType: 'module'
    },
    rules: {
        indent: 'off',
        '@typescript-eslint/indent': ['warn', 4],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        semi: 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/no-extra-semi': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-var-requires': 'warn',
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/prefer-readonly': ['warn'],
        '@typescript-eslint/method-signature-style': 'warn',
        'eol-last': 'warn',
        'no-useless-constructor': 'off',
        'no-trailing-spaces': 'warn',
        '@typescript-eslint/no-useless-constructor': 'warn',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'curly': 'warn'
    }
};
