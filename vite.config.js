import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log("mode", mode);
  
  return {
    plugins: [react()],
    base: mode === "development" ? "/" : "/e-commerce-site/",
  }
})
