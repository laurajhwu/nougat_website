module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: [0, "double"],
    "comma-dangle": ["error", "only-multiline"],
    semi: [2, "always"],
    "space-before-function-paren": [2, "never"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
