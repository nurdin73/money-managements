import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { join, resolve } from "path";

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: ["resources/js/index.js"],
            refresh: true,
        }),
        nodeResolve({
            browser: true,
            extensions: [".js", ".jsx"],
        }),
    ],
    define: {
        global: {},
    },
    resolve: {
        alias: [
            {
                find: /~(.+)/,
                replacement: join(process.cwd(), "node_modules/$1"),
            },
            { find: "@", replacement: resolve(__dirname, "./resources/js") },
        ],
    },
    esbuild: {
        loader: "jsx",
        include: /resources\/js\/.*\.jsx?$/,
        exclude: [],
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
        watch: {
            usePolling: true,
        },
    },
});
