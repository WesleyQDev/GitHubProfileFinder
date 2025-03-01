import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  port: process.env.PORT || 3000,
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['site-production-0f0e.up.railway.app'],
  },
})

