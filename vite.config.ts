import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: Number(env.PORT),
    },
    plugins: [UnoCSS(), react(), tsconfigPaths()],
    resolve: {
      alias: [{ find: /^~/, replacement: '' }],
    },
    css: {
      modules: {
        generateScopedName: 'stayowner-[local]-[hash:base64:5]',
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "src/styles/vars.less";`,
        },
      },
    },
  };
});
