import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import Unocss from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import presetTagify from '@unocss/preset-tagify';
import presetWebFonts from '@unocss/preset-web-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    cors: true,
    port: 8081,
  },
  plugins: [
    vue(),
    eslint(),
    Unocss({
      theme: {
        // fontSize: {
        //   sm: '0.8rem',
        //   base: '1.25rem',
        //   xl: '1.25rem',
        //   '2xl': '1.563rem',
        //   '3xl': '1.953rem',
        //   '4xl': '2.441rem',
        //   '5xl': '3.052rem',
        // },
      },
      shortcuts: {
        'custom-input':
          'py-1 px-1 border-b-1 border-spacing-y-2 bg-transparent focus:outline-none focus:border-gray-300',
      },
      presets: [
        presetUno(),
        presetTagify(),
        presetWebFonts({
          provider: 'google', // default provider
          sans: 'Inter',
          mono: ['Fira Code', 'Fira Mono:400,700'],
        }),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
    }),
  ],
});
