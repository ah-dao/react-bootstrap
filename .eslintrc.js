module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint-config-airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'no-param-reassign': 0,
    'react/static-property-placement': 0,
    'reat/prefer-stateless-function': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-shadow': 0,
    'linebreak-style': 0,
    'no-restricted-exports': 0,
    'jsx-a11y/click-events-have-key-events': 0,
  },
}
