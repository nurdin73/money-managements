import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { join, resolve } from "path";

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: ["resources/ts/index.tsx"],
            refresh: true,
        }),
        nodeResolve({
            browser: true,
            extensions: [".ts", ".tsx"],
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
            { find: "@", replacement: resolve(__dirname, "./resources/ts") },
        ],
    },
    esbuild: {
        loader: "tsx",
        include: /resources\/ts\/.*\.tsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
                ".ts": "tsx",
            },
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
});
