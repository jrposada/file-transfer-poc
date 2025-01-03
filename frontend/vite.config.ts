import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const config = ({ mode }: { mode: string }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: `/${process.env.VITE_BASE_PATH!}`,
        server: {
            port: parseInt(process.env.VITE_PORT!),
        },
        plugins: [react(), tsconfigPaths()],
    });
};

export default config;
