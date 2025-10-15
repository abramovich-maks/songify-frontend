import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const certPath = path.resolve(__dirname, 'server.crt');
const keyPath = path.resolve(__dirname, 'server.key');

const httpsOptions =
    fs.existsSync(certPath) && fs.existsSync(keyPath)
        ? {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
        }
        : undefined;

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5174,
        https: httpsOptions,
        proxy: {
            '/songs': {
                target: 'https://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            '/token': {
                target: 'https://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
