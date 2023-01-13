module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    // Required for certain syntax usages
    ecmaVersion: 2019,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    indent: "off",
    "object-curly-spacing": "off",
  },
};
