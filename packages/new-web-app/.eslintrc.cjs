module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
    },
    extends: [
        // By extending from a plugin config, we can get recommended rules without having to add them manually.
        'eslint:recommended',
        'eslint-config-prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {
                alwaysTryTypes: true,
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
    plugins: ['import'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'all',
                tabWidth: 4,
                semi: true,
                singleQuote: true,
                printWidth: 120,
                bracketSpacing: true,
            },
        ],
        'react/react-in-jsx-scope': 0,
        'react/jsx-no-target-blank': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        '@typescript-eslint/no-explicit-any': 0,
    },
};
