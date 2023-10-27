import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dotenv from "dotenv";
import { expand } from "dotenv-expand";

const myEnv = dotenv.config({ path: "../.env" });
expand(myEnv);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
});
