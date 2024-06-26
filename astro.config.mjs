import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false,
  }), vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === "iconify-icon",
      },
    },
  }),],
  output: "server",
  adapter: vercel()
});