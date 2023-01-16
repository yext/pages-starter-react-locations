import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";

export default defineConfig({
  base: "/subdirectory/",
  appType: 'mpa',
  plugins: [react(), yextSSG()],
});
