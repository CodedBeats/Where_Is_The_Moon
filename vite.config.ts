import { defineConfig } from "vite";

export default defineConfig({
    server: {
        host: true,
        allowedHosts: true,
        proxy: {
            '/textures': {
                target: 'https://www.solarsystemscope.com',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
