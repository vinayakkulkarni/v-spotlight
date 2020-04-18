import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'VSpotlight',
    file: 'dist/v-spotlight.min.js',
  },
  plugins: [
    commonjs(),
    vue(),
    terser(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
};
