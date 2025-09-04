import path from "node:path";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import vue from "eslint-plugin-vue";
import typescript from "@typescript-eslint/eslint-plugin";
import vueParser from "vue-eslint-parser";
import typescriptParser from "@typescript-eslint/parser";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.vue"],
    plugins: { vue },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: typescriptParser, // 让 <script> 部分用 ts 解析
      },
    },
    rules: {
      ...vue.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.ts", "**/*.js"],
    plugins: { "@typescript-eslint": typescript },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
    },
  },
  eslintPluginPrettierRecommended,
];
