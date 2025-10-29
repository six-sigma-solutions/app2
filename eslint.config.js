// https://docs.expo.dev/guides/using-eslint/
// const { defineConfig } = require('eslint/config');
// const expoConfig = require("eslint-config-expo/flat");

// module.exports = defineConfig([
//   expoConfig,
//   {
//     ignores: ["dist/*"],
//   }
// ]);
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  { ignores: ["dist/*"] },
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.tsx", "**/*.ts", "**/*.js"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      // add other custom rules here
    },
  },
]);

