import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

export default defineConfig(() => {
  dotenv.config();
  return {
    assetsInclude: ["**/*.glb", "**.*.mp3"],
    root: "./Front",
    plugins: [
      {
        name: "treat-js-files-as-jsx",
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null;
          // Use the exposed transform from vite, instead of directly
          // transforming with esbuild
          return transformWithEsbuild(code, id, {
            loader: "jsx",
            jsx: "automatic",
          });
        },
      },
      react(),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.js",
      include: ["**/*.test.js", "**/*.spec.js"],
      root: ".",
    },
    resolve: {
      alias: {
        "@Game": path.resolve(__dirname, "./Game"),
        "@Common": path.resolve(__dirname, "./Common"),
        "@Front": path.resolve(__dirname, "./Front/src"),
        "@Assets": path.resolve(__dirname, "./Front/assets"),
        "@MiniGames": path.resolve(__dirname, "./Mini-games"),
      },
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          ".js": "jsx",
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000, // You can change this to your preferred port
    },
    build: {
      outDir: "dist", // Output folder for the build
    },
  };
});
