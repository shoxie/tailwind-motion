module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'next',
    'airbnb',
    'plugin:import/typescript',
  ],
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 0,
    'react/jsx-props-no-spreading': 0,
    semi: [2, 'never'],
    'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'] }],
    'no-unused-vars': 'off',
    'import/no-unresolved': 0,
    '@next/next/no-img-element': 0,
    indent: ['error', 2, { MemberExpression: 'off', VariableDeclarator: { var: 2, let: 2, const: 3 } }],
    'react/prop-types': 0,
  },
}