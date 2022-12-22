import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";

export default defineConfig(() => {
  console.log("defineConfig()");
  process.on('unhandledRejection', (reason, promise) => {
    console.log("tris")
    console.log(reason)
    console.log("tan")
    process.exit(1);
  })
  process.on('uncaughtException', (reason) => {
    console.log("timb")
    console.log(reason)
    console.log("lin")
  })
  return {
    plugins: [react(), yextSSG()],
  }
});
