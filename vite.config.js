import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/sites-scripts/vite-plugin";

export default defineConfig({
  plugins: [react(), yextSSG()],
});
