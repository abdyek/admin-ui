import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '127.0.0.1',
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8999/',
        changeOrigin: true,
        bypass: (req) => {
          if (req.url.startsWith('/admin') || req.url.startsWith('/src') || req.url.startsWith('/@vite') || req.url.startsWith('/node_modules') || req.url.startsWith('/@id')) {
            return req.url
          }
        }
      },
    },
  },
})
