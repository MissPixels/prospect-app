module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/component-name-in-template-casing': ['warn', 'PascalCase', {
      ignores: ['component', 'nuxt-link', 'nuxt', 'no-ssr', 'transition', 'transition-group'],
    }],
  }
}
