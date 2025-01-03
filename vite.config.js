import { defineConfig, loadEnv } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { join, resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  if (command === 'serve') {
    return {
      plugins: [react()],
      define: {
        global: {},
      },
      resolve: {
        alias: [
          {
            find: /~(.+)/,
            replacement: join(process.cwd(), 'node_modules/$1'),
          },
          { find: '@', replacement: resolve(__dirname, './resources/ts') },
        ],
      },
      server: {
        port: process.env.VITE_PORT || 5137,
      },
    }
  }
  return {
    plugins: [
      react(),
      laravel({
        input: ['resources/ts/index.tsx'],
        refresh: true,
      }),
    ],
    define: {
      global: {},
    },
    resolve: {
      alias: [
        {
          find: /~(.+)/,
          replacement: join(process.cwd(), 'node_modules/$1'),
        },
        { find: '@', replacement: resolve(__dirname, './resources/ts') },
      ],
    },
    server: {
      port: process.env.VITE_PORT || 5137,
    },
  }
})
