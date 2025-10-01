module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.json",
    sourceType: "module",
    createDefaultProgram: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "import"], // Add this line
  extends: [
    "airbnb-typescript/base",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-plusplus": 0,
  },
  ignorePatterns: ["build/*", ".eslintrc.js"],
};
