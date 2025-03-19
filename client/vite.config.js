import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // host: '10.1.1.7', 
    host: '0.0.0.0', 
    port: 5173,       
  }
})
