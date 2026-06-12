import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// world-atlas ships a large JSON; allow importing it as a module.
export default defineConfig({
  plugins: [react()],
})
