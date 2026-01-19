export default {
  server: { open: true },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // SPA Rewrite
  base: '/',
};
