import { p as createComponent, q as renderTemplate, x as renderComponent, s as maybeRenderHead } from './astro/server_BtvYfb51.mjs';
import { $ as $$Layout } from './Layout_CmAKYzvE.mjs';

const $$Project = createComponent(($$result, $$props, $$slots) => {
  let campaigns = [];
  for (let i = 0; i < 20; i++) {
    campaigns.push({
      id: i,
      title: `Campaign ${i}`,
      description: `Description for Campaign ${i}`,
      image: `https://picsum.photos/seed/${i}/300/200`,
      tags: ["tag1", "tag2", "tag3"],
      status: "active"
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="w-screen h-screen grid grid-cols-3"> <div class="w-full h-full border-r col-span-2 overflow-y-auto"> <div class="py-12 grid grid-cols-5 items-center w-full border-b"> <div class="flex flex-col justify-start items-start w-full col-span-3 px-8"> <h1 class="text-7xl font-brand font-bold">Ruilabs</h1> <div class="font-brand font-bold flex justify-start items-center text-2xl mt-4">
on&nbsp;
<div class=" bg-blue-500 rounded-xl p-2 px-4 text-white ">
:Remo
</div> </div> </div> <div class="w-full col-span-2"> ${renderComponent($$result2, "HeaderAction", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/HeaderAction.vue", "client:component-export": "default" })} </div> <!-- <button class="text-4xl font-brand font-bold px-8 bg-blue-500 text-white py-4 rounded-xl duration-300 hover:scale-90 hover:ring-4 hover:ring-blue-100 hover:ring-offset-4 active:scale-75">CTA</button> --> </div> <section> <div class="p-4"> <h2 class="text-xl font-brand font-semibold">Campaigns</h2> </div> ${campaigns.map((_c) => renderTemplate`<div class="w-full grid grid-cols-5 items-center p-4"> <p class="col-span-3">Campaign Name </p> <p>Joined</p> <div class="w-full flex justify-end items-center"> ${renderComponent($$result2, "CampaignModal", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/campaign/Modal.vue", "client:component-export": "default" })} </div> </div>`)} </section> </div> <div class="w-full h-full flex justify-center items-center"> ${renderComponent($$result2, "ChatBubble", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/ChatBubble.vue", "client:component-export": "default" })} </div> </main> ` })}`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/project.astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/project.astro";
const $$url = "/project";

export { $$Project as default, $$file as file, $$url as url };
