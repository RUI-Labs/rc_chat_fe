import { p as createComponent, q as renderTemplate, x as renderComponent, v as createAstro, s as maybeRenderHead } from './astro/server_BtvYfb51.mjs';
import { $ as $$AdminLayout } from './AdminLayout_czAxDFTR.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { user } = Astro2.locals;
  let projects = await fetch(`${Astro2.url.origin}/api/projects.json?owner=${user?.id}`);
  projects = await projects.json();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full flex justify-center items-center text-white flex-col"> <p class="font-brand py-12">Pick a project to start</p> <div class="flex justify-center items-center space-x-4"> ${projects.map((project) => renderTemplate`<button class="w-[200px] h-[200px] bg-stone-800 border border-stone-700 rounded-xl hover:scale-105 duration-300"> <span class="text-xl font-brand font-semibold">${project.name}</span> </button>`)} <div class="flex flex-col justify-center items-center"> ${renderComponent($$result2, "NewProjectFromFresh", null, { "wallet": user?.id, "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/admin/NewProjectFromFresh.vue", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <button class="w-28 h-28 bg-blue-500 text-white rounded-full hover:scale-105 duration-300 mb-4 flex justify-center items-center"> ${renderComponent($$result3, "iconify-icon", "iconify-icon", { "icon": "mdi:plus", "class": "text-5xl" })} </button> ` })} <span class="text-xl font-brand font-semibold -mb-4">New Project</span> </div> </div> </div> ` })}`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/index.astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/index.astro";
const $$url = "/admin";

export { $$Index as default, $$file as file, $$url as url };
