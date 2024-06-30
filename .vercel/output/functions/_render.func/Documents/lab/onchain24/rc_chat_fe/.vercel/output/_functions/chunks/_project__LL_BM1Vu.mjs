import { p as createComponent, q as renderTemplate, x as renderComponent, w as renderHead, t as addAttribute, v as createAstro } from './astro/server_BtvYfb51.mjs';
/* empty css                        */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$project = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$project;
  const { project } = Astro2.params;
  const project_info = await fetch(`${Astro2.url.origin}/api/project/${project}.json`).then((res) => res.json());
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', '><title>Astro</title><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"><link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet" crossorigin="anonymous"><script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer><\/script>', '</head> <body class="w-screen h-screen flex justify-center items-center">  ', " </body></html>"])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "ChatVue", null, { "client:only": "vue", "project_info": project_info, "client:component-hydration": "only", "client:component-path": "@/components/chat_1/Chat.vue", "client:component-export": "default" }));
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/project_1/[project].astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/project_1/[project].astro";
const $$url = "/project_1/[project]";

export { $$project as default, $$file as file, $$url as url };
