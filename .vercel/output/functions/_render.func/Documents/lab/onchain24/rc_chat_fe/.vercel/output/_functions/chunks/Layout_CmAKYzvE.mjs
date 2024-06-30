import { p as createComponent, q as renderTemplate, z as renderSlot, w as renderHead, t as addAttribute, v as createAstro } from './astro/server_BtvYfb51.mjs';
import 'clsx';
/* empty css                        */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', '><title>Astro</title><link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Playwrite+NZ:wght@100..400&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" crossorigin="anonymous"><script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer><\/script>', "</head> <body>  ", " </body></html>"])), addAttribute(Astro2.generator, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
