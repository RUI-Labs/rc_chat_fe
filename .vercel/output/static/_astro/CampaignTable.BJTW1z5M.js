import{B as S}from"./index.DUM513om.js";import{u as D,g as M,h as B,a as V,F as q,T as I,b as O,c as E,d as z,e as G,f as X}from"./TableRow.4Kn-oSxF.js";import{v as x}from"./utils.CFP4Y51R.js";import{_ as J}from"./_plugin-vue_export-helper.DlAUqK2U.js";import{c as A}from"./createLucideIcon.CCYx18s6.js";import{g as j,r as w,j as P,a as l,c as i,d as o,F as c,e as u,t as f,h as v,i as d,f as y,P as n,n as Q,b as g,X as W}from"./runtime-core.esm-bundler.C8n-v3-D.js";import"./runtime-dom.esm-bundler.CkxCeCJQ.js";/**
 * @license lucide-vue-next v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=A("ArrowUpDownIcon",[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]]);/**
 * @license lucide-vue-next v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=A("ChevronDownIcon",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),Z={__name:"CampaignTable",props:["steps","data"],setup(k,{expose:C}){C();const b=k,{steps:t,data:p}=j(b),h=w([]),s=w([]),r=(e,a,m)=>e.getValue(a)>=m,_=[{accessorKey:"address",header:()=>n("div",{class:"text-blue-200 font-brand"},"Address"),cell:({row:e})=>n("div",{class:"text-white"},`${String(e.getValue("address")).substring(0,10)}...`)},{accessorKey:"id",header:()=>n("div",{class:"text-blue-200 font-brand"},"ID"),cell:({row:e})=>n("div",{class:"text-white"},e.getValue("id"))},{accessorKey:"name",header:()=>n("div",{class:"text-blue-200 font-brand"},"Name"),cell:({row:e})=>n("div",{class:"text-white"},e.getValue("name"))},{accessorKey:"progress",filterFn:r,header:({column:e})=>n(S,{variant:"ghost",class:"hover:bg-stone-800 text-white hover:text-white",onClick:()=>e.toggleSorting(e.getIsSorted()==="asc")},()=>[n("div",{class:"text-blue-200 font-brand"},"Progress"),n(L,{class:"ml-2 h-4 w-4"})]),cell:({row:e})=>{const a=e.getValue("progress");return n("div",{class:"pl-4 text-white"},`${a}%`)}},{accessorKey:"chat",header:()=>n("div",{class:"text-blue-200 font-brand text-center"},"Chat"),cell:({row:e})=>n("div",{class:"flex justify-center"},[n("button",{onClick:()=>T(e.original.id),class:"border px-4 py-2 rounded-xl hover:bg-blue-500 hover:text-white hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 duration-300 hover:scale-95 active:scale-75 flex justify-center items-center space-x-2 bg-gray-50"},"Chat")])}],H=D({data:p?.value,columns:_,getCoreRowModel:M(),getSortedRowModel:B(),onSortingChange:e=>x(e,h),onColumnFiltersChange:e=>x(e,s),getFilteredRowModel:V(),state:{get sorting(){return h.value},get columnFilters(){return s.value}}}),T=e=>{console.log(`Opening chat for user ID: ${e}`)},K=e=>{if(e===0)return!1;let a=t.value[e].count-t.value[e-1].count,m=(a/t.value[e-1].count*100).toFixed(2);return`${a} (${m}%)`},N=P(()=>{let e=t.value[t.value.length-1].count,a=(e/t.value[0].count*100).toFixed(2);return{count:e,percent:a}}),U=e=>{if(R(e))s.value=[];else{let a=e/(t.value.length-1)*100;console.log("stepIdxProgress",a),s.value=[{id:"progress",value:a,operator:"greaterThanOrEqual",metadata:{idx:e}}]}},R=e=>s.value.filter(a=>a.metadata?.idx===e).length>0,F={props:b,steps:t,data:p,sorting:h,columnFilters:s,customGreaterThanOrEqual:r,columns:_,table:H,openChat:T,getSubtitle:K,conversionPercent:N,filterStep:U,isSelectedFilter:R,toRefs:j,computed:P,h:n,ref:w,get Button(){return S},get useVueTable(){return D},get getCoreRowModel(){return M},get FlexRender(){return q},get getSortedRowModel(){return B},get getFilteredRowModel(){return V},get valueUpdater(){return x},get Table(){return I},get TableBody(){return O},get TableCell(){return E},get TableHead(){return z},get TableHeader(){return G},get TableRow(){return X},get ArrowUpDown(){return L},get ChevronDown(){return Y}};return Object.defineProperty(F,"__isScriptSetup",{enumerable:!1,value:!0}),F}},$={key:0},ee={"aria-label":"Progress"},te={role:"list",class:"divide-y bg-stone-800 text-stone-50 md:flex md:divide-y-0"},oe=["onClick"],re={class:"group flex w-full items-center"},se={class:"flex items-center justify-between px-6 py-4 text-sm font-medium"},le={class:"flex justify-start items-center space-x-2"},ne={class:"font-brand text-xl"},ae=o("iconify-icon",{icon:"mdi:user",class:"text-stone-400 text-3xl"},null,-1),ie={class:"ml-4"},ce={class:"text-lg font-medium text-white"},de={key:0,class:"text-sm text-stone-400"},ue={key:0,class:"absolute right-0 top-0 hidden h-full w-5 md:block duration-0","aria-hidden":"true"},ge=o("svg",{class:"h-full w-full text-stone-500 bg-stone-800",viewBox:"0 0 22 80",fill:"#3b82f6",preserveAspectRatio:"none"},[o("path",{d:"M0 -2L20 40L0 82","vector-effect":"non-scaling-stroke",stroke:"currentcolor","stroke-linejoin":"round"})],-1),he=[ge],fe=W('<div class="group-hover:opacity-0 absolute right-0 top-0 hidden h-full w-5 md:block duration-0" aria-hidden="true"><svg class="h-full w-full text-stone-500 bg-stone-800" viewBox="0 0 22 80" fill="#292524" preserveAspectRatio="none"><path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round"></path></svg></div><div class="group-hover:opacity-100 opacity-0 absolute right-0 top-0 hidden h-full w-5 md:block duration-0" aria-hidden="true"><svg class="h-full w-full text-stone-500 bg-stone-800" viewBox="0 0 22 80" fill="#44403c" preserveAspectRatio="none"><path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round"></path></svg></div>',2),ve={class:"relative flex pr-1"},be={class:"w-full h-full flex justify-center items-center"},pe={class:"p-2 bg-blue-500 rounded-xl text-right text-white"},_e=o("p",{class:"text-sm"},"Conversion Rate",-1),me={class:"font-brand font-semibold text-xl"},xe={class:"w-full"},we={class:""};function ye(k,C,b,t,p,h){return t.steps?.length>0?(l(),i("div",$,[o("nav",ee,[o("ol",te,[(l(!0),i(c,null,u(t.steps,(s,r)=>(l(),i("li",{onClick:_=>t.filterStep(r),key:s.name,class:Q(["relative md:flex md:flex-1 cursor-pointer group pl-6 -ml-6",[t.isSelectedFilter(r)?"bg-blue-500":"hover:bg-stone-700 hover:border-l  hover:border-l-stone-800"]])},[o("div",re,[o("div",se,[o("div",le,[o("span",ne,f(s.count),1),ae]),o("div",ie,[o("div",ce,f(s.name),1),t.getSubtitle(r)?(l(),i("div",de,f(t.getSubtitle(r)),1)):y("",!0)])])]),(l(),i(c,{key:0},[t.isSelectedFilter(r)?(l(),i("div",ue,he)):(l(),i(c,{key:1},[fe],64))],64))],10,oe))),128)),o("li",ve,[o("div",be,[o("div",pe,[_e,o("span",me,f(t.conversionPercent.percent)+" %",1)])])])])]),o("div",xe,[o("div",we,[v(t.Table,null,{default:d(()=>[v(t.TableHeader,{class:"bg-stone-700"},{default:d(()=>[(l(!0),i(c,null,u(t.table.getHeaderGroups(),s=>(l(),g(t.TableRow,{class:"hover:bg-stone-700",key:s.id},{default:d(()=>[(l(!0),i(c,null,u(s.headers,r=>(l(),g(t.TableHead,{key:r.id},{default:d(()=>[r.isPlaceholder?y("",!0):(l(),g(t.FlexRender,{key:0,render:r.column.columnDef.header,props:r.getContext()},null,8,["render","props"]))]),_:2},1024))),128))]),_:2},1024))),128))]),_:1}),v(t.TableBody,null,{default:d(()=>[(l(!0),i(c,null,u(t.table.getRowModel().rows,s=>(l(),g(t.TableRow,{class:"hover:bg-stone-800",key:s.id},{default:d(()=>[(l(!0),i(c,null,u(s.getVisibleCells(),r=>(l(),g(t.TableCell,{key:r.id},{default:d(()=>[v(t.FlexRender,{render:r.column.columnDef.cell,props:r.getContext()},null,8,["render","props"])]),_:2},1024))),128))]),_:2},1024))),128))]),_:1})]),_:1})])])])):y("",!0)}const Be=J(Z,[["render",ye]]);export{Be as default};
