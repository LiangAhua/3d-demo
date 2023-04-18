import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginMars3d } from 'vite-plugin-mars3d';
import path from "path"
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // "@": path.join(__dirname, "src")
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, "src/components/ui/base.less")}";`
      }
    }
  },
  plugins: [
    vue(),
    vitePluginMars3d(),
    Components({
      resolvers: [AntDesignVueResolver()],
    })
  ],
  base: '/',
  server: {
    port: '3000',
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.160.202:9098',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
},
})