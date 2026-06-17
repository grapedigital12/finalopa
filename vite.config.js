import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Only needed for GitHub Pages "project sites"
  // (https://<user>.github.io/<repo-name>/). Uncomment and set to your
  // repo name. Leave commented out for Vercel/Netlify or a GitHub Pages
  // "user site" — they serve from the domain root.
  // base: '/your-repo-name/',
})
