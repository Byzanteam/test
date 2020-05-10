import { basename, dirname } from 'path'
import { sync } from 'fast-glob'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

const plugins = [
  commonjs(),
  replace({
    'process.env.NODE_ENV': '"production"',
  }),
  resolve({
    extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
  }),
  terser(),
  typescript(),
  vue({ css: false }),
]
const files = sync('src/components/*/index.ts')
const components = files.map(input => ({
  input,
  output: {
    file: `dist/${basename(dirname(input))}/index.js`,
    format: 'esm',
  },
  external: ['vue'],
  plugins: [
    postcss({
      extract: 'style.css',
      minimize: true,
    }),
    ...plugins,
  ],
}))

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/~name~.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/~name~.esm.js',
        format: 'esm',
      },
    ],
    external: ['vue'],
    plugins: [
      postcss({
        extract: '~name~.css',
        minimize: true,
      }),
      ...plugins,
    ],
  },
  ...components,
]
