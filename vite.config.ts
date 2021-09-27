import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";

import SVGIcons from "vite-plugin-svg-icons";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import { resolve } from "path";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, resolve(__dirname)) };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      Vue(),
      AutoImport({
        include: [
          /\.[tj]s?$/, // .ts, .js
          /\.vue$/, // .vue
        ],
        dts: "types/generated/auto-imports.d.ts",
        imports: ["vue"],
      }),
      Components({
        // relative paths to the directory to search for components.
        dirs: ["src/components"],

        // valid file extensions for components.
        extensions: ["vue", "ts", "js"],
        // search for subdirectories
        deep: true,
        // resolvers for custom components
        resolvers: [],

        // generate `components.d.ts` global declarations,
        // also accepts a path for custom filename
        dts: "types/generated/components.d.ts",

        // Allow subdirectories as namespace prefix for components.
        directoryAsNamespace: false,
        // Subdirectory paths for ignoring namespace prefixes
        // works when `directoryAsNamespace: true`
        globalNamespaces: [],

        // filters for transforming targets
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [
          /[\\/]node_modules[\\/]/,
          /[\\/]\.git[\\/]/,
          /[\\/]\.nuxt[\\/]/,
        ],
      }),
      SVGIcons({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    server: {
      port: parseInt(process.env.VITE_PORT) || 3000,
      cors: true,
      strictPort: false,
      hmr: true,
      fs: {
        strict: false,
        // Allow serving files from one level up to the project root
        // allow: ["./src/graphql/**/*.graphql"],
      },
      // proxy: {
      //   "/api": {
      //     target: process.env.VITE_API_KEY,
      //     changeOrigin: true,
      //     autoRewrite: true,
      //   },
      // },
      watch: {
        usePolling: true,
        useFsEvents: true,
      },
    },
    resolve: {
      alias: {
        "#": resolve(__dirname, "public"),
        "@": resolve(__dirname, "src"),
      },
    },
    define: { "process.env": process.env },
  });
};
