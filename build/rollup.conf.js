import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  plugins: [vue(), babel()],
  output: [
    {
      format: 'umd',
      name: 'VSpotlight',
      file: 'dist/v-spotlight.js',
    },
    {
      format: 'es',
      file: 'dist/v-spotlight.esm.js',
    },
  ],
};
