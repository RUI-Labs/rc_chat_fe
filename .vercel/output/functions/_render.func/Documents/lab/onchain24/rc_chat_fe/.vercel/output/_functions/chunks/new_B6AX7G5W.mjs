import { p as createComponent, q as renderTemplate, t as addAttribute, w as renderHead, x as renderComponent, v as createAstro } from './astro/server_BtvYfb51.mjs';
/* empty css                        */

const $$Astro = createAstro();
const $$New = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Playwrite+NZ:wght@100..400&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">${renderHead()}</head> <body>  <main class="w-full min-w-screen h-full min-h-screen grid grid-cols-2 bg-blue-800"> <div class="w-full h-full flex flex-col justify-center items-center"> <div class="p-8 relative text-9xl text-white"> <h1 class="font-brand font-semibold">New Stamp?</h1> <h1 class="font-brand font-semibold">Cool.</h1> <br> <br> <div id="stepslot"></div> </div> </div> ${renderComponent($$result, "NewStamper", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/NewStamper.vue", "client:component-export": "default" })} </main> </body></html>`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/new.astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/new.astro";
const $$url = "/new";

export { $$New as default, $$file as file, $$url as url };
