import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import yextSSG from "@yext/pages/vite-plugin";

export default defineConfig({
  plugins: [react(), yextSSG()],
});
