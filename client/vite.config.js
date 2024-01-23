import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/url_shortener',
  plugins: [react()],
  build:{
    outDir:'dist'
  },
  publicDir:'static'
})
