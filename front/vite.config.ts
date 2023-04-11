import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "");
  dotenv.config({
    path: path.join(path.resolve(), ".env"),
  });
  dotenv.config({
    path: path.join(path.resolve(), `.env.${mode}`),
  });
  return {
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      host: process.env.HOST,
      port: Number(process.env.PORT) || 3000,
      proxy: {
        "/io": {
          target: "http://localhost:4000/",
          ws: true,
          changeOrigin: true,
          rewrite(path) {
            console.log(path);
            return path.replace(/\/io/, "");
          },
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});
