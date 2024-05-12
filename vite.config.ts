import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import glsl from "vite-plugin-glsl"; // vite扩展glsl语言
import tailwindcss from 'tailwindcss' // 导入tailwindcss

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@assets" : path.resolve(__dirname, "../src/assets")
    },
  },
  plugins: [
    vue(),
    glsl({
      compress: true,
      watch: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
      ],
    },
  },
});
