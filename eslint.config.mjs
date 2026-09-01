import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

/**
 * Flat config (ESLint 9+). `eslint-config-next/core-web-vitals` already bundles
 * the base Next rules, the TypeScript preset, and the Core Web Vitals rules, so
 * it is the only preset this project needs to spread in.
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "public/**",
      "**/*.tsbuildinfo",
    ],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      /**
       * Off on purpose. Every violation in this repo is an ordinary apostrophe
       * in page copy -- "There's No Time Like the Present" -- which JSX renders
       * correctly as written. Escaping them to `&apos;` only makes the copy
       * harder to read and edit, and it teaches a habit that silently breaks
       * outside JSX, where the entity would render literally.
       */
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
