import { p as createComponent, q as renderTemplate, x as renderComponent, s as maybeRenderHead } from './astro/server_BtvYfb51.mjs';
/* empty css                        */
import { $ as $$Layout } from './Layout_CmAKYzvE.mjs';

const $$Campaign = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="w-full min-w-screen h-full min-h-screen flex justify-center items-center bg-white flex-col"> <div class="w-full grid grid-cols-3 justify-center items-center"> <div class="p-8 col-span-2 relative"> <a href="/project"> <button class="p-4 px-6 text-xl bg-gray-200 rounded-xl mb-12 flex justify-center items-center duration-300 hover:scale-90 hover:ring-4 hover:ring-gray-100 hover:ring-offset-4"> ${renderComponent($$result2, "iconify-icon", "iconify-icon", { "class": "text-3xl mr-4", "icon": "ep:back" })}
Back to Campaign List
</button> </a> <h1 class="text-8xl font-brand font-semibold leading-[8rem] mb-12">Giveaway of 50 USD worth of Tokens</h1> <div class="flex justify-start items-center space-x-4"> <p class="text-3xl">You're invited by</p> <div class="bg-blue-500 rounded-full p-3 text-4xl flex justify-start items-center pr-6"> <div class="h-16 aspect-square bg-white rounded-full mr-2"></div> <div class="text-white">Ruilabs</div> </div> </div> ${renderComponent($$result2, "Stamper", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/Stamper.vue", "client:component-export": "default" })} </div> <div id="stampzone" class="w-full flex justify-center items-center p-12 pr-24"></div> </div> </main> ` })}`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/campaign.astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/campaign.astro";
const $$url = "/campaign";

export { $$Campaign as default, $$file as file, $$url as url };
