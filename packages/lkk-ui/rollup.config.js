import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      exclude: ['**/*.stories.tsx', '**/*.test.tsx']
    }),
    postcss({
      extensions: ['.css'],
      extract: 'styles.css',
      minimize: true,
    }),
    terser(),
  ],
  external: ['react', 'react-dom'],
};
