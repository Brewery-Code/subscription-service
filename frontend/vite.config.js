import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/styles/components/_variables.scss';`,
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
