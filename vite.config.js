import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";

export default defineConfig((context) => {
  console.log(context, process.env);
  return {
    plugins: [react(), yextSSG()],
  }
});
