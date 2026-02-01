import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,

  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  // 必要ならここにプロジェクト固有ルールを追加
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // ROBLOX側と同じ思想：_ で始まる未使用引数は許容
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // 型の明示を強制しない（開発速度優先）
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
]);
