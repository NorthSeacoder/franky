import { defineConfig } from 'tsup'

const env = process.env.NODE_ENV;
export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  sourcemap: env === 'development',
  minify: env === 'production',
  watch: env === 'development',
  format: ['cjs'],
  shims: false,
  dts: false,
  external: [
    'vscode',
  ],
  noExternal:["tailwindcss","css-to-tailwindcss"]
})
