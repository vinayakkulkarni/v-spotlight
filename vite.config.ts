import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import type { OutputOptions, PreRenderedAsset } from 'rollup';
import pkg from './package.json';

const banner = `/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author.name}
* @license ${pkg.license}
*/`;

const assetFileNames: OutputOptions['assetFileNames'] = (
  chunkInfo: PreRenderedAsset,
): string => {
  if (chunkInfo.name === 'style.css') return 'v-spotlight.css';
  return chunkInfo.name || 'v-spotlight.css';
};

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VSpotlight',
      formats: ['es', 'cjs', 'umd'],
      fileName: pkg.name,
    },
    commonjsOptions: {
      extensions: ['.js', '.ts', '.vue'],
      exclude: 'src/**',
      include: 'node_modules/**',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        exports: 'named',
        banner,
        strict: true,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'vue',
        },
        assetFileNames,
      },
    },
  },
});
