import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";

export default defineConfig({
  base: "/subdirectory/",
  plugins: [react(), yextSSG()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `subdirectory/assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'subdirectory/assets/js/[name]-[hash].js',
        entryFileNames: 'subdirectory/assets/js/[name]-[hash].js',
      },
    },
  },
});
