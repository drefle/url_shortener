import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/url_shortener/',
  plugins: [react()],
  build:{
    outDir:'dist',
    assetsDir:'assets',
  },
  publicDir:'static'
})
