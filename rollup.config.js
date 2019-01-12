import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    input: 'vue-option-events.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
      {
        name: 'vueOptionEvents',
        file: pkg.unpkg,
        format: 'umd',
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
