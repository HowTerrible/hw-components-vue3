import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL("./src/components", import.meta.url)),
      '@js': fileURLToPath(new URL("./src/ts", import.meta.url)),
      '@directives': fileURLToPath(new URL("./src/directives", import.meta.url)),
      '@assets': fileURLToPath(new URL("./src/assets", import.meta.url)),
      '@views': fileURLToPath(new URL("./src/views", import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
        @import "@/styles/common-color.less";
        @import "@/styles/common-style.less";
      `,
        javascriptEnabled: true,
      },
    },
  },

})
