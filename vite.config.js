import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // 반드시 dist로 설정 (Vercel에서 찾는 폴더)
  },
  server: {
    open: true,
  },
});
