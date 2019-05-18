import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const banner = `/**
 * vue-option-events by @Cweili - https://github.com/Cweili/vue-option-events
 */`;

export default [
  {
    input: 'vue-option-events.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        banner,
      },
      {
        file: pkg.module,
        format: 'es',
        banner,
      },
      {
        name: 'vueOptionEvents',
        file: pkg.unpkg,
        format: 'umd',
        banner,
      },
    ],
    external: [
      'vue',
    ],
    plugins: [
      resolve(),
      babel(),
    ],
  },
];
