import { p as createComponent, q as renderTemplate, t as addAttribute, w as renderHead, x as renderComponent, v as createAstro } from './astro/server_BtvYfb51.mjs';
/* empty css                        */

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet" crossorigin="anonymous">${renderHead()}</head> <body>  <main class="w-screen h-screen flex justify-center items-center flex-col bg-stone-950 font-adminss"> <img class="rounded-xl overflow-hidden w-24 h-24 mb-4" src="/logo.png"> <h1 class="text-5xl text-white mb-4 font-brand font-bold">REMO</h1> <h1 class="text-center text-2xl font-brand text-white">More Reach, More Growth</h1> <div class="w-full max-w-sm bg-stone-900 rounded-xl mt-12 border border-stone-800"> <p class="mt-8 mb-6 text-center text-white">Sign In with Ethereum</p> <div> ${renderComponent($$result, "Siwe", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/Siwe.vue", "client:component-export": "default" })} </div> </div> </main> </body></html>`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/login.astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/login.astro";
const $$url = "/admin/login";

export { $$Login as default, $$file as file, $$url as url };
