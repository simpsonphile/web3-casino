// eslint.config.js

import { defineConfig } from "eslint/config";
import eslintPluginReact from "eslint-plugin-react";
import globals from "globals";
import js from "@eslint/js";

const ignores = [
  "node_modules",
  "Front/dist/**",
  "Front/public/**",
  "Contract-hooks/**",
  "Contracts/typechain-types/**",
  "Contracts/typechain-js/**",
];

export default defineConfig([
  {
    ignores,
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    ...eslintPluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...eslintPluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    ...js.configs.recommended,
    ignores,
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    languageOptions: {
      ...js.configs.recommended.languageOptions,

      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    ignores,
    files: ["Front/**/*.js"],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    files: ["Front/**/*.js", "Game/**/*.js"],
    globals: {
      t: "readonly",
    },
  },
  {
    files: ["Contracts/test/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        it: "readonly",
        ethers: "readonly",
        describe: "readonly",
      },
    },
  },
  {
    files: ["Server/**/*.js"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
  },
  {
    files: ["**/*.test.js"],
    env: {
      jest: true,
    },
    plugins: ["jest"],
    extends: ["plugin:jest/recommended"],
  },
]);
