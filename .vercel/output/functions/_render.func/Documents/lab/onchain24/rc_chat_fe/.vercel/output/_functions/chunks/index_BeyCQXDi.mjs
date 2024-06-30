import { p as createComponent, q as renderTemplate, x as renderComponent, v as createAstro, s as maybeRenderHead, t as addAttribute } from './astro/server_BtvYfb51.mjs';
import { $ as $$AdminLayout } from './AdminLayout_czAxDFTR.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, renderSlot, computed, createVNode, toRefs, toDisplayString } from 'vue';
import { useForwardPropsEmits, TooltipRoot, TooltipContent as TooltipContent$1, TooltipPortal, TooltipTrigger as TooltipTrigger$1, TooltipProvider as TooltipProvider$1 } from 'radix-vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, c as cn } from './index_CgHqcgaf.mjs';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Tooltip",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    delayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const __returned__ = { props, emits, forwarded, get TooltipRoot() {
      return TooltipRoot;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["TooltipRoot"], mergeProps($setup.forwarded, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/Tooltip.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TooltipContent",
  props: {
    forceMount: { type: Boolean },
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: {},
    sideOffset: { default: 4 },
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    const __returned__ = { props, emits, delegatedProps, forwarded, get TooltipContent() {
      return TooltipContent$1;
    }, get TooltipPortal() {
      return TooltipPortal;
    }, get cn() {
      return cn;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["TooltipPortal"], _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent($setup["TooltipContent"], mergeProps({ ...$setup.forwarded, ..._ctx.$attrs }, {
          class: $setup.cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", $setup.props.class)
        }), {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode($setup["TooltipContent"], mergeProps({ ...$setup.forwarded, ..._ctx.$attrs }, {
            class: $setup.cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", $setup.props.class)
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["class"])
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipContent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const TooltipContent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TooltipTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props, get TooltipTrigger() {
      return TooltipTrigger$1;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["TooltipTrigger"], mergeProps($setup.props, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipTrigger.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TooltipTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TooltipProvider",
  props: {
    delayDuration: {},
    skipDelayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props, get TooltipProvider() {
      return TooltipProvider$1;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["TooltipProvider"], mergeProps($setup.props, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipProvider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TooltipProvider = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CardTooltip",
  props: ["text"],
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { text } = toRefs(props);
    const __returned__ = { props, text, get Tooltip() {
      return Tooltip;
    }, get TooltipContent() {
      return TooltipContent;
    }, get TooltipProvider() {
      return TooltipProvider;
    }, get TooltipTrigger() {
      return TooltipTrigger;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["TooltipProvider"], mergeProps({ delayDuration: 0 }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent($setup["Tooltip"], null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent($setup["TooltipTrigger"], null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default")
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent($setup["TooltipContent"], null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<p${_scopeId3}>${ssrInterpolate($setup.text)}</p>`);
                  } else {
                    return [
                      createVNode("p", null, toDisplayString($setup.text), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode($setup["TooltipTrigger"], null, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                }),
                createVNode($setup["TooltipContent"], null, {
                  default: withCtx(() => [
                    createVNode("p", null, toDisplayString($setup.text), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode($setup["Tooltip"], null, {
            default: withCtx(() => [
              createVNode($setup["TooltipTrigger"], null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              createVNode($setup["TooltipContent"], null, {
                default: withCtx(() => [
                  createVNode("p", null, toDisplayString($setup.text), 1)
                ]),
                _: 1
              })
            ]),
            _: 3
          })
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/campaign/CardTooltip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CardTooltip = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let campaigns = await fetch(`${Astro2.url.origin}/api/projects/${Astro2.params.id}/campaigns.json`).then((res) => res.json());
  console.log(JSON.stringify(campaigns));
  const url = Astro2.url.pathname;
  let projectSlug = url.match(/\/admin\/project\/([^\/]*)/)?.[1];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="p-4 py-12 flex justify-between items-center"> <h1 class="text-3xl pl-4 font-brand font-bold text-white">Campaigns</h1> </div> <!-- {JSON.stringify(user)} --> <div class="p-4"> <div class="w-full grid gap-4" style="grid-template-columns: repeat(auto-fill,minmax(300px,1fr));"> ${campaigns.map((campaign) => renderTemplate`<a${addAttribute(`/admin/project/${projectSlug}/campaign/${campaign.campaign_id}`, "href")}> <div class="w-full h-48 bg-stone-800 border-2 border-stone-800 rounded-xl flex flex-col justify-between items-center p-4 group overflow-hidden cursor-pointer hover:ring-stone-500 hover:ring-4 hover:shadow-xl duration-300"> <div class="w-full h-full flex justify-center items-center group-hover:scale-150 duration-300"> <span class="text-3xl text-stone-50 tracking-widest font-bold">TEST</span> </div> <div class="grid grid-cols-3 justify-center items-center w-full text-stone-400"> ${renderComponent($$result2, "CardTooltip", CardTooltip, { "client:load": true, "text": `Unique Visits: ${campaign.metrics.find((o) => o.name === "visit").count}`, "client:component-hydration": "load", "client:component-path": "@/components/campaign/CardTooltip.vue", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="flex justify-center items-center w-full"> ${renderComponent($$result3, "iconify-icon", "iconify-icon", { "class": "text-xl", "icon": "mdi:eye" })}
&nbsp;${campaign.metrics.find((o) => o.name === "visit").count} </div> ` })} ${renderComponent($$result2, "CardTooltip", CardTooltip, { "client:load": true, "text": `Connected Wallet: ${campaign.metrics.find((o) => o.name === "connect").count}`, "client:component-hydration": "load", "client:component-path": "@/components/campaign/CardTooltip.vue", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="flex justify-center items-center w-full"> ${renderComponent($$result3, "iconify-icon", "iconify-icon", { "class": "text-xl", "icon": "fluent:plug-connected-16-filled" })} ${renderComponent($$result3, "iconify-icon", "iconify-icon", { "class": "text-xl", "icon": "material-symbols:wallet" })}
&nbsp; ${campaign.metrics.find((o) => o.name === "visit").count} </div> ` })} ${renderComponent($$result2, "CardTooltip", CardTooltip, { "client:load": true, "text": `Engaged: ${campaign.metrics.find((o) => o.name === "engage")?.count || 0}`, "client:component-hydration": "load", "client:component-path": "@/components/campaign/CardTooltip.vue", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="flex justify-center items-center w-full"> ${renderComponent($$result3, "iconify-icon", "iconify-icon", { "class": "text-xl", "icon": "gridicons:reader-following-conversation" })}
&nbsp; ${campaign.metrics.find((o) => o.name === "engage")?.count || 0} </div> ` })} </div> </div> </a>`)} </div> <div class="flex flex-col justify-center items-center"> ${renderComponent($$result2, "NewCampaignDialog", null, { "project_id": Astro2.params.id, "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/campaign/NewCampaignDialog.vue", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate`  <button class="w-28 h-28 bg-blue-500 text-white rounded-full hover:scale-105 duration-300 mb-4 flex justify-center items-center"> ${renderComponent($$result3, "iconify-icon", "iconify-icon", { "icon": "mdi:plus", "class": "text-5xl" })} </button> ` })} <span class="text-xl font-brand font-semibold -mb-4 text-white">New Campaign</span> </div> </div> </div> ` })}`;
}, "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/project/[id]/index.astro", void 0);

const $$file = "/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/project/[id]/index.astro";
const $$url = "/admin/project/[id]";

export { $$Index as default, $$file as file, $$url as url };
