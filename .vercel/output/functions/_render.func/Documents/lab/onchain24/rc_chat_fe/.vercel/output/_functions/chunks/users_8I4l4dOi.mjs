import { p as createComponent, q as renderTemplate, x as renderComponent, v as createAstro, s as maybeRenderHead } from './astro/server_BtvYfb51.mjs';
import { $ as $$AdminLayout } from './AdminLayout_czAxDFTR.mjs';

const $$Astro = createAstro();
const $$Users = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Users;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="p-4 py-12 flex justify-between items-center"> <h1 class="text-3xl pl-4 font-brand font-bold text-white">Users</h1> </div> ${renderComponent($$result2, "UserTable", null, { "project_id": Astro2.params?.id, "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/users/UserTable.vue", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/project/[id]/users.astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/project/[id]/users.astro";
const $$url = "/admin/project/[id]/users";

export { $$Users as default, $$file as file, $$url as url };
