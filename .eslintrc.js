module.exports = {
  extends: [
    'eslint:recommended',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true,
      'experimentalObjectRestSpread': true,
    },
  },
  plugins: [
    'react',
    'import',
  ],
  rules: {
    indent: ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    quotes: ['error', 'single', { 'allowTemplateLiterals': true }],
    semi: ['error', 'never'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',
    'import/no-anonymous-default-export': ['error', {
      allowArray: true,
      allowArrowFunction: false,
      allowAnonymousClass: false,
      allowAnonymousFunction: false,
      allowLiteral: true,
      allowObject: true,
    }],
    'operator-linebreak': ['error', 'before', {
      overrides: {
        '=': 'ignore',
        '&&': 'ignore',
        '||': 'ignore',
        '+': 'ignore',
        '-': 'ignore',
      },
    }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
  },
}
