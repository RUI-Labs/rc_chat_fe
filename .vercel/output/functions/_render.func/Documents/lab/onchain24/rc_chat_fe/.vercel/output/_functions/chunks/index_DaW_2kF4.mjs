import { p as createComponent, q as renderTemplate, t as addAttribute, w as renderHead, v as createAstro } from './astro/server_BtvYfb51.mjs';
import 'clsx';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderHead()}</head> <body> <h1>Astro</h1> </body></html>`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/index.astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
