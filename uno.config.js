// uno.config.ts

import { defineConfig, presetIcons, presetMini } from 'unocss';

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
      bgNatural: '#FDFDFD',
      primary: '#005ab0',
      secondary: '#c4e2ff',
      white: '#fff',
    },
  },
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        heroicons: () => import('@iconify-json/heroicons/icons.json').then((i) => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default),
        bx: () => import('@iconify-json/bx/icons.json').then((i) => i.default),
      },
    }),
    // presetAttributify(),
    // presetTypography(),
    // presetWebFonts({
    //   fonts: {
    //     // ...
    //   },
    // }), /
  ],
  transformers: [
    // transformerDirectives(),
    // transformerVariantGroup()
  ],
});
