import { p as createComponent, q as renderTemplate, x as renderComponent, v as createAstro, s as maybeRenderHead, t as addAttribute } from './astro/server_BtvYfb51.mjs';
import { $ as $$AdminLayout } from './AdminLayout_czAxDFTR.mjs';
import { B as Button } from './index_CgHqcgaf.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const campaign = await fetch(`https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/campaigns?select=*&id=eq.${id}`, {
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg5MTY5OSwiZXhwIjoyMDI4NDY3Njk5fQ.RnuTetoEW2cr_2yHfiTttQcidqe3Trour21lyrTRYxA",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg5MTY5OSwiZXhwIjoyMDI4NDY3Njk5fQ.RnuTetoEW2cr_2yHfiTttQcidqe3Trour21lyrTRYxA"
    }
  }).then((res) => res.json()).then((res) => res[0]);
  const metrics = await fetch(`https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/campaign_metrics?select=*&campaign_id=eq.${id}`, {
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg5MTY5OSwiZXhwIjoyMDI4NDY3Njk5fQ.RnuTetoEW2cr_2yHfiTttQcidqe3Trour21lyrTRYxA",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg5MTY5OSwiZXhwIjoyMDI4NDY3Njk5fQ.RnuTetoEW2cr_2yHfiTttQcidqe3Trour21lyrTRYxA"
    }
  }).then((res) => res.json());
  const steps = metrics.map((o, i) => {
    return {
      id: i,
      name: o.name,
      href: "#",
      count: o.count
    };
  });
  const sampleData = await fetch("https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/rpc/get_user_events_by_campaign_id", {
    method: "POST",
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg5MTY5OSwiZXhwIjoyMDI4NDY3Njk5fQ.RnuTetoEW2cr_2yHfiTttQcidqe3Trour21lyrTRYxA",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg5MTY5OSwiZXhwIjoyMDI4NDY3Njk5fQ.RnuTetoEW2cr_2yHfiTttQcidqe3Trour21lyrTRYxA",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      _campaign_id: id
    })
  }).then((res) => res.json()).then((res) => res.map((o) => {
    return {
      id: o.user_id,
      name: o.user_name,
      address: o.user_address,
      progress: o.events.reduce((a, o2) => {
        if (o2 === "connect") {
          a += 50;
        }
        if (o2 === "visit") {
          a += 50;
        }
        return a;
      }, 0)
    };
  }));
  const url = Astro2.url.pathname;
  let projectSlug = url.match(/\/admin\/project\/([^\/]*)/)?.[1];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="p-4 pb-4 pt-4 grid grid-cols-6 mb-2 items-end"> <div class="col-span-3 flex justify-start items-center mb-8"> <a${addAttribute(`/admin/project/${projectSlug}`, "href")}> ${renderComponent($$result2, "Button", Button, { "variant": "ghost", "class": "text-white underline text-lg font-brand" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "iconify-icon", "iconify-icon", { "icon": "bi:arrow-left", "class": "mr-4" })}
Back
` })} </a> </div> <div class="col-span-3 flex justify-end items-center  mb-8"> ${renderComponent($$result2, "Button", Button, { "class": "bg-stone-800 hover:bg-stone-700" }, { "default": ($$result3) => renderTemplate`Edit Campaign` })} </div> <div class="col-span-4 pl-2"> <p class="text-lg mb-2 font-brand font-bold text-stone-400">Campaign</p> <div class="w-full flex justify-start items-center my-3"> <div class="text-sm p-1 px-3 bg-blue-500 text-white font-brand font-bold rounded-md"> ${campaign.tag} </div> </div> <h1 class="text-4xl font-brand font-bold text-white">${campaign.id} (title)</h1> </div> <div class="w-full flex justify-end items-center col-span-2"> ${renderComponent($$result2, "CampaignLink", null, { "client:only": "vue", "link_text": "https://google.com", "client:component-hydration": "only", "client:component-path": "@/components/campaign/CampaignLink.vue", "client:component-export": "default" })} </div> </div> ${renderComponent($$result2, "CampaignTable", null, { "steps": steps, "data": sampleData, "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/campaign/CampaignTable.vue", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/project/[id]/campaign/[id].astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/project/[id]/campaign/[id].astro";
const $$url = "/admin/project/[id]/campaign/[id]";

export { $$id as default, $$file as file, $$url as url };
