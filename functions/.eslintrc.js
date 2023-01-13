module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    indent: "off",
    "object-curly-spacing": "off",
  },
};
