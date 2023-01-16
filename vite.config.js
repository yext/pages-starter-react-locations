import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";

export default defineConfig({
  base: "https://devrelativeprefixtopath-brightly--radical--smelt-pgsdemo-com.preview.pagescdn.com/",
  plugins: [react(), yextSSG()],
});
