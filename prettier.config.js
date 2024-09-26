/** @type {import('prettier').Config} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  // tailwindcss
  tailwindAttributes: ['theme'],
  tailwindFunctions: ['twMerge', 'createTheme'],
  bracketSpacing: true,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 125,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  parser: 'typescript',
};
