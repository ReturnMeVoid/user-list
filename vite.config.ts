import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },

  server: {
    port: 3000,
  },

  build: {
    outDir: 'docs',
    assetsInlineLimit: 0,

    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
})
