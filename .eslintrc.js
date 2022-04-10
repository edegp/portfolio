module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks", // reactのhooksの設定は別れているので別途入れます

    "plugin:@typescript-eslint/recommended", // typescriptの推奨設定を入れます

    "plugin:@typescript-eslint/recommended-requiring-type-checking", // typescriptの型チェックをします

    "plugin:@next/next/core-web-vitals", // Next.jsとCore Web Vitalsのチェック

    "prettier", // prettierと競合するESLintのルールを無効化します
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    project: "./tsconfig.json", // plugin:@typescript-eslint/recommended-requiring-type-checkingの参照するtsconfig
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // hush no-use-before-define error in "import React from 'react';"
    // see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/no-unresolved": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "react/prop-types": "off",
    // "@typescript-eslint\no-misused-promises": 1,
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "react/jsx-no-duplicate-props": 1,
    "jsx-a11y/aria-props": 1,
    // omit .ts .tsx in import statement
    // see https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
    "react/function-component-definition": [
      0,
      {
        namedComponents: "function-declaration",
      },
    ],
    "no-param-reassign": [2, { props: false }],
    // "arrow-body-style": ["error", "always"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],

    // allow named exports without default export
    "import/prefer-default-export": "off",

    // allow importing storybooks from devDependencies
    // see https://github.com/storybookjs/storybook/issues/1992#issuecomment-335001056
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [".storybook/**", "**/*.stories.tsx"],
      },
    ],

    // allow jsx in .tsx
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],

    // nextjs does not need React in every file
    "react/react-in-jsx-scope": "off",

    // use this pattern for default props
    //
    // interface Props {
    //   prop1?: boolean;
    // }
    // const Component1: FC<Props> = ({ prop1 = false }: Props) => (
    //   <Component1 prop1={prop1} />
    // );
    "react/require-default-props": "off",

    // allow <App {...props} />
    "react/jsx-props-no-spreading": "off",
  },
  settings: {
    // typescriptのaliasがエラーにならないように
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
      node: {
        extensions: [".ts", ".tsx", ".jsx", ".js"],
        paths: ["../components"],
      },
    },
  },
};
