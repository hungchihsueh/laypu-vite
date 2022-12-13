import { resolve } from "path";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { splitVendorChunkPlugin } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";

import { compression } from "vite-plugin-compression2";
export default defineConfig({
  plugins: [
    compression(),
    ViteMinifyPlugin({}),
    splitVendorChunkPlugin(),

    legacy({
      targets: ["defaults", "not IE 11"],
      modernPolyfills: true,
    }),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        app: resolve(__dirname, "/index.html"),
        physical: resolve(__dirname, "disability/physical.html"),
        hearing: resolve(__dirname, "disability/hearing.html"),
        resource: resolve(__dirname, "disability/resource.html"),
        sitemap: resolve(__dirname, "disability/sitemap.html"),
      },
    },
  },
});
