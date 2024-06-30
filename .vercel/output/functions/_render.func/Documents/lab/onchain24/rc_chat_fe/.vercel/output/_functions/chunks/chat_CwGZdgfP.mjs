import { p as createComponent, q as renderTemplate, t as addAttribute, w as renderHead, x as renderComponent, v as createAstro } from './astro/server_BtvYfb51.mjs';

const $$Astro = createAstro();
const $$Chat = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Chat;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderHead()}</head> <body>  <h1>Chat</h1> ${renderComponent($$result, "ChatVue", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/components/chat.vue", "client:component-export": "default" })} </body></html>`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/chat.astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/chat.astro";
const $$url = "/chat";

export { $$Chat as default, $$file as file, $$url as url };
