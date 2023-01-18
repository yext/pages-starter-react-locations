import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";

export default defineConfig({
  base: "./",
  plugins: [react(), yextSSG()],
  transform: (code, id) => {
    return {
      code: code.replace(/\/src\/(.*)\.(svg|jp?g|png|webp)/, 'http://localhost:3000/src/$1.$2'),
      map: null,
    }
  },
});
