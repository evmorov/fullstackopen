module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.graphql'],
      extends: [
        'plugin:@graphql-eslint/schema-recommended',
        'plugin:@graphql-eslint/operations-recommended',
      ],
      parserOptions: {
        schema: './schema.graphql',
        operations: './operations/**/*.graphql',
      },
      rules: {
        '@graphql-eslint/require-description': 'off',
        '@graphql-eslint/strict-id-in-types': 'off',
        '@graphql-eslint/no-anonymous-operations': 'off',
        '@graphql-eslint/require-id-when-available': 'off',
        '@graphql-eslint/naming-convention': 'off',
        '@graphql-eslint/no-typename-prefix': 'off',
      },
    },
  ],
}
