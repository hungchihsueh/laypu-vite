import { resolve } from "path";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { splitVendorChunkPlugin } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { compression } from "vite-plugin-compression2";
export default defineConfig({
  base: "",
  plugins: [
    ViteMinifyPlugin({}),
    splitVendorChunkPlugin(),
    compression(),
    legacy({
      targets: ["defaults", "not IE 11"],
      modernPolyfills: true,
    }),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        app: resolve(__dirname, "index.html"),
        physical: resolve(__dirname, "physical.html"),
        hearing: resolve(__dirname, "hearing.html"),
        resource: resolve(__dirname, "resource.html"),
        sitemap: resolve(__dirname, "sitemap.html"),
      },
    },
  },
});
