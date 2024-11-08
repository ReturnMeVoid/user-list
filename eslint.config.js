import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
   { languageOptions: { globals: globals.browser } },
   pluginJs.configs.recommended,
   ...tseslint.configs.recommended,
   ...pluginVue.configs["flat/essential"],

   {
      files: ["**/*.{js,mjs,cjs,ts,vue}"],
      rules: {
         "no-restricted-imports": [
            "error",
            { patterns: ["@/modules/*/*"] },
         ],
      },
   },

   {
      files: ["**/*.vue"],
      languageOptions: {
         parserOptions: { parser: tseslint.parser },
      },
   },
]
