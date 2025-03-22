import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import tsconfig from "./tsconfig.json";

const alias = Object.fromEntries(
  // For Each Path in tsconfig.json
  Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
      // Remove the "/*" from the key and resolve the path
      key.replace("/*", ""),
      // Remove the "/*" from the value Resolve the relative path
      path.resolve(__dirname, value.replace("/*", ""))
  ])
);

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.+(ts|tsx|js)'],
    root: './',
  },

  plugins: [tsconfigPaths()],
  resolve: {
    alias
  }
})