import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/rgdocs/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../rgdocs", // 👈 output straight into your main site folder
    emptyOutDir: true,          // optional: clears folder before rebuild
  },
})
