import{c as s,a as T}from"./wagmiConfig.Chk1Y_fx.js";import{g as U}from"./index.SVBtah2_.js";import{i as S,d as h,e as H,$ as A}from"./stamp.DRRuyw06.js";import{D as M,a as R,b as X,c as J,d as L,e as Y,f as G}from"./DialogFooter.DtzIYxse.js";import{z as Q}from"./utils.CFP4Y51R.js";import{_ as Z}from"./_plugin-vue_export-helper.DlAUqK2U.js";import{I as $}from"./Input.z9xLTbiq.js";import{B as ee}from"./index.DUM513om.js";import{S as te}from"./StampCircle.DyuAEC7d.js";import{g as b,r as j,w as z,c as k}from"./watchConnections.CEVD3vQ5.js";import{g as v}from"./getAccount.CrAKNmNJ.js";import{d as ne}from"./disconnect.fQnpZ0pp.js";import{r as d,o as F,k as E,a as u,c as f,h as a,i as r,j as oe,q as ae,s as le,p as re,l as i,d as t,u as se,n as N,F as _,f as x,e as ie,t as ce}from"./runtime-core.esm-bundler.C8n-v3-D.js";import"./getEthersSigner.DIrFHjWe.js";import"./getConnectorClient.CvN7nnx2.js";import"./inherits_browser.BGXtg88A.js";import"./supabase.Cq5c-OsS.js";import"./createLucideIcon.CCYx18s6.js";import"./runtime-dom.esm-bundler.CkxCeCJQ.js";import"./index.LclF5nvU.js";const de={__name:"NewStamper",emits:["update"],setup(W,{expose:n,emit:B}){n();const e=d(!1),g=B,m=d(0),o=()=>{if(m.value==0&&H.set(O.value),m.value==3){e.value=!1,g("update");return}m.value+=1},I=async l=>{console.log("createWallet",l),await V(l)&&o()},V=async l=>{const c=b(s).find(D=>D?.id===l?.id);if(console.log("selectedConnector",c),c)try{return await k(s,{connector:c}),!0}catch(D){return console.log("connectWallet",D),!1}return!1},K=async()=>{try{await k(s,{connector:T({appName:"Ruilabs",preference:"smartWalletOnly"})}),o()}catch(l){console.log(l)}},y=d([]),C=d();let p;F(async()=>{U(),console.log(b(s)),y.value=b(s).filter(l=>l.id!=="injected"&&l.id!=="coinbaseWalletSDK"),y.value.push({name:"Coinbase Smart Wallet",id:"coinbaseWalletSDK"}),await j(s),v(s)?.address&&(g("update"),await S(),h()),C.value=v(s),p=z(s,{async onChange(l){const c=v(s);console.log("onChange wallet",c),C.value=c,await S(),A.value&&(g("update"),h())}})}),E(()=>{p&&p()});const O=d(),q=async()=>{try{await window.OneSignal.Notifications.requestPermission(),window?.OneSignal?.Notifications.permission?o():alert("Please allow notification push at your application.")}catch(l){consol.info("allowNotification",l)}},w=d(!1),P={open:e,emit:g,page:m,nextPage:o,createWallet:I,connectWallet:V,createNewWallet:K,walletOptions:y,walletAccount:C,get unwatch(){return p},set unwatch(l){p=l},nameInput:O,allowNotification:q,isCollecting:w,collectStamp:async()=>{w.value||(w.value=!0,await h(),w.value=!1,o())},computed:oe,markRaw:ae,onMounted:F,ref:d,watch:le,onUnmounted:E,get reconnect(){return j},get getAccount(){return v},get watchConnections(){return z},get disconnect(){return ne},get getConnectors(){return b},get connect(){return k},get config(){return s},get getUserSubscriptionId(){return U},get initXmtp(){return h},get initUser(){return S},get $username(){return H},get $userData(){return A},get Dialog(){return M},get DialogContent(){return R},get DialogDescription(){return X},get DialogFooter(){return J},get DialogHeader(){return L},get DialogTitle(){return Y},get DialogTrigger(){return G},get VisuallyHidden(){return Q},get Input(){return $},get Button(){return ee},StampCircle:te,get coinbaseWallet(){return T}};return Object.defineProperty(P,"__isScriptSetup",{enumerable:!1,value:!0}),P}},ue={class:""},fe=t("h4",{class:"sr-only"},"Status",-1),ge={class:"mt-6","aria-hidden":"true"},me={class:"overflow-hidden rounded-full bg-gray-200"},pe={class:"mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid"},_e=t("h1",{class:"text-xl font-brand font-bold mt-8"},"What's your name?",-1),we=t("p",{class:"mb-2"},"Keep it short and simple ;)",-1),he=t("h1",{class:"text-xl font-brand font-bold mt-8 text-center"},"Connect your wallet",-1),be={class:"w-full flex flex-col"},ve={class:"w-full py-1"},xe=t("hr",null,null,-1),ye=t("h1",{class:"text-center font-brand font-semibold"},"Or Create One (free!)",-1),Ce=t("h1",{class:"text-xl font-brand font-bold mt-8"},"Notifications",-1),De=t("p",{class:"mb-2"},"Please allow us to send you notifications",-1),Se={class:"flex space-x-4"},ke=t("h1",{class:"text-xl font-brand font-bold mt-8 text-center"},"Collect your stamp!",-1),Ne=t("p",{class:"mb-2 text-center"},"You're all set up and ready to go!",-1),We={class:"w-full h-full flex justify-center items-center mb-4"};function Be(W,n,B,e,g,m){return u(),f("div",ue,[a(e.Dialog,{open:e.open,"onUpdate:open":n[7]||(n[7]=o=>e.open=o)},{default:r(()=>[a(e.DialogTrigger,{"as-child":""},{default:r(()=>[re(W.$slots,"default",{onClick:n[0]||(n[0]=o=>e.open=!1)})]),_:3}),a(e.DialogContent,{class:"sm:max-w-[425px]"},{default:r(()=>[a(e.DialogHeader),a(e.VisuallyHidden,null,{default:r(()=>[a(e.DialogTitle,null,{default:r(()=>[i("Edit profile")]),_:1})]),_:1}),a(e.VisuallyHidden,null,{default:r(()=>[a(e.DialogDescription,null,{default:r(()=>[i("Make changes to your profile here. Click save when you're done.")]),_:1})]),_:1}),t("div",null,[fe,t("div",ge,[t("div",me,[t("div",{class:"h-2 rounded-full bg-indigo-600",style:se([e.page==0?"width:0%;":"",e.page==1?"width:50%;":""])},null,4)]),t("div",pe,[t("div",{class:N([[e.page==0?"text-blue-500":""],"text-left"])},"Name",2),t("div",{class:N([[e.page==1?"text-blue-500":""],"text-center"])},"Wallet",2),t("div",{class:N([[e.page==2?"text-blue-500":""],"text-right"])},"Notification",2)])])]),e.page==0?(u(),f(_,{key:0},[_e,we,a(e.Input,{modelValue:e.nameInput,"onUpdate:modelValue":n[1]||(n[1]=o=>e.nameInput=o),type:"text",placeholder:"Example: Jesse"},null,8,["modelValue"]),a(e.Button,{onClick:n[2]||(n[2]=o=>e.nextPage())},{default:r(()=>[i("Next")]),_:1})],64)):x("",!0),e.page==1?(u(),f(_,{key:1},[he,t("div",be,[(u(!0),f(_,null,ie(e.walletOptions,o=>(u(),f("div",ve,[a(e.Button,{onClick:I=>e.createWallet(o),class:"w-full font-brand font-bold text-blue-500 border-blue-500",variant:"outline"},{default:r(()=>[i(ce(o.name),1)]),_:2},1032,["onClick"])]))),256))]),xe,ye,a(e.Button,{onClick:n[3]||(n[3]=o=>e.createNewWallet()),class:"bg-blue-500"},{default:r(()=>[i("Create")]),_:1})],64)):x("",!0),e.page==2?(u(),f(_,{key:2},[Ce,De,t("div",Se,[a(e.Button,{class:"w-full bg-blue-500",onClick:n[4]||(n[4]=o=>e.allowNotification())},{default:r(()=>[i("Allow")]),_:1}),a(e.Button,{variant:"outline",class:"w-full",onClick:n[5]||(n[5]=o=>e.nextPage())},{default:r(()=>[i("Deny")]),_:1})])],64)):x("",!0),e.page==3?(u(),f(_,{key:3},[ke,Ne,t("div",We,[a(e.StampCircle,{address:e.walletAccount?.address,name:e.nameInput},null,8,["address","name"])]),a(e.Button,{onClick:n[6]||(n[6]=o=>e.collectStamp())},{default:r(()=>[i("Collect Stamp")]),_:1})],64)):x("",!0)]),_:1})]),_:3},8,["open"])])}const Qe=Z(de,[["render",Be]]);export{Qe as default};
