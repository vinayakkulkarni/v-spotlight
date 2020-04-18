import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      name: 'VSpotlight',
      file: 'dist/v-spotlight.cjs.js',
    },
    {
      format: 'umd',
      name: 'VSpotlight',
      file: 'dist/v-spotlight.js',
    },
    {
      format: 'es',
      name: 'VSpotlight',
      file: 'dist/v-spotlight.esm.js',
    },
  ],
  plugins: [
    commonjs(),
    vue(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
};
