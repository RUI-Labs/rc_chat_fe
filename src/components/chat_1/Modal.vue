<template>
  <div>
    <div @click="toggleModal()">
      <slot></slot>
    </div>

    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-[51]" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-[52] w-screen h-screen overflow-y-auto">
          <div class="flex items-center justify-center text-center w-full h-full">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel id="mainCard"  class="w-full h-full flex justify-center items-center relative">

                <template v-if="stampedCardImage">
                  <img class="object-contain" :src="stampedCardImage" alt="">
                </template>

                <template v-else>

                  <div v-if="!noStamp" ref="stampEl" :class="[zoomStamp ? 'scale-100' : 'scale-75', 'duration-300 transition-transform']" class="w-[300px] h-[300px] fixed z-40 bottom-0 left-0 pointer-events-none">
                    <StampCircle :diameter="200" :address="$userData.value?.wallet_address" :name="$userData.value?.name"></StampCircle>
                  </div>

                  <section class="w-full max-w-md bg-white relative rounded-xl">
                    <button @click="toggleModal()" class="absolute top-2 right-2 w-8 h-8 flex justify-center items-center bg-red-100 rounded-full active:scale-90 hover:bg-red-500 text-red-500 hover:text-white hover:ring-red-300 hover:ring-4 hover:ring-offset-4 duration-300">
                      <iconify-icon class="text-xl" icon="material-symbols:close"></iconify-icon>
                    </button>
                    <div class="p-8 mt-4">
                      <p class="mb-4">you're invited to join:</p>
                      <h1 class="text-4xl font-brand font-bold">{{ campaign_info?.message }}</h1>
                    </div>

                    <div class="px-8 text-center pb-2">
                      <p class="text-xl">Please provide your stamp if you would like to participate.</p>
                    </div>

                    <div class="w-full flex justify-center items-center py-12">
                      <div ref="stampzoneEl" @click="confirmStamp()" class="w-[200px] aspect-square border flex justify-center items-center overflow-hidden relative cursor-pointer" :class="[stampStop ? 'bg-green-500 rounded-full' : 'rounded-xl ']">
                        <template v-if="noStamp">
                          <div class="bg-black/40 w-full h-full absolute top-0 left-0 z-20 flex justify-center items-center backdrop-blur-sm flex-col">
                            <iconify-icon class="text-white text-7xl" icon="material-symbols:lock"></iconify-icon>
                            <p class="text-white mt-2">No stamp found!</p>
                          </div>
                        </template>

                        <div v-if="!stampStop" class="animate-bounce">
                          <p class="font-brand font-bold rotate-[-20deg] text-blue-500">Stamp Here!</p>
                        </div>

                        <div v-if="stampStop">
                          <!-- <iconify-icon class="text-8xl text-white" icon="hugeicons:tick-04"></iconify-icon> -->
                          <svg v-if="stampStop" xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 24 24"><path fill="white" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" /></svg>
                        </div>
                      </div>
                    </div>

                    <div v-if="noStamp" class="p-4 space-y-2">
                      <button @click.stop="showConnectWalletModal()" class="bg-blue-100 w-full rounded-xl text-blue-500 py-4 font-brand font-semibold text-lg hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 active:scale-75 duration-300">Already have Stamp?</button>
                      <button @click.stop="showStampModal()" class="bg-blue-500 w-full rounded-xl text-white py-4 font-brand font-semibold text-lg hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 active:scale-75 duration-300">Get a Stamp (Free!)</button>
                    </div>

                </section>
              </template>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs, watch } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { $showNewStampModal, $showWalletModal, $receiptImageData, $showReceipt, $userData, confirmStampAndSendMessage, sendImage, $showCampaignModal, $selectedCampaign } from "@/stores/stamp_1";

import { useMouseInElement } from "@vueuse/core";
import StampCircle from "@/components/StampCircle.vue";
import { toPng } from "html-to-image";

const props = defineProps([ "project_info", "campaign_info" ]);
const { project_info, campaign_info } = toRefs(props);

const open = ref(false);
const noStamp = ref(true);
const stampedCardImage = ref(null);

const toggleModal = () => {
  open.value = !open.value;
  
  if(!open.value) {
    $showCampaignModal.set(false);
  }

  if(open.value) {
    if(stampedCardImage.value) {
      setTimeout(() => {
        open.value = false;
        $showCampaignModal.set(false);
      }, 1000); 
    }
  }

};

const showStampModal = () => {

  console.log('123')

  $showNewStampModal.set(true);
  $showCampaignModal.set(false);
  open.value = false;
};

const showConnectWalletModal = () => {
  $showWalletModal.set(true);
  $showCampaignModal.set(false);
  open.value = false;
};

const zoomStamp = ref(false);

const stampStop = ref(false);
const stampzoneEl = ref(null);
const stampEl = ref(null);

const { x, y, isOutside } = useMouseInElement(stampzoneEl);

watch(x, (newX) => {
  if (stampStop.value) return;
  if (stampEl.value == null) return;

  if (isOutside.value) {
    stampEl.value.style.left = `${newX}px`;
  } else {
    stampEl.value.style.left = `${newX - 150}px`;
  }
});

watch(y, (newY) => {
  if (stampStop.value) return;
  if (stampEl.value == null) return;

  if (isOutside.value) {
    stampEl.value.style.top = `${newY}px`;
  } else {
    stampEl.value.style.top = `${newY - 150}px`;
  }
  // stampEl.value.style.top = `${newY - 150}px`;
});

watch(isOutside, () => {
  if (stampStop.value) return;
  zoomStamp.value = !isOutside.value;
});

const confirmStamp = () => {
  if (noStamp.value) return;
  if (stampedCardImage.value) return;

  stampStop.value = true;
  zoomStamp.value = true;

  confirmStampAndSendMessage(project_info.value, campaign_info.value);

  let node = document.getElementById("mainCard");
  toPng(node).then( async (dataUrl) => {
      var img = new Image();
      img.src = dataUrl;
      // document.body.appendChild(img);
      // stampedCardImage.value = dataUrl;

      // console.log(dataUrl);

        $receiptImageData.set(dataUrl)
        $showReceipt.set(true)
        

        await sendImage(project_info.value, campaign_info.value);

        open.value = false;
        $showCampaignModal.set(false);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};


onMounted(() => {
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlCampaign = urlParams.get('campaign')
  console.log('urlCampaign', urlCampaign);

  // if(campaign_info.value?.id == urlCampaign) {
  //   toggleModal();
  // }
  
  $userData.subscribe(() => {

    const stamped = $userData.value?.stamps.find(x => Number(x.campaign_id) === Number(urlCampaign));
    if ($userData.value?.wallet_address) noStamp.value = false;

    if(stamped) {
      $showReceipt.set(true);
      $receiptImageData.set(stamped.url);
      
      setTimeout(() => {
        console.log('qqq')
        $showCampaignModal.set(false);
      }, 1000); 
      
      // stampFound.value = stamped;
      stampedCardImage.value = stamped.url;
    }

  })


  $selectedCampaign.subscribe((value) => {
    if(value) {
      if($userData.value?.stamps.find(x => Number(x?.campaign_id) === Number(urlCampaign))) {
        setTimeout(() => {
          $showCampaignModal.set(false);
        }, 1000); 
      }
    }
  })



  $showCampaignModal.subscribe((val) => {
    console.log('##')
    let _value = $showCampaignModal.get()
    console.log('_value', _value)
    if(_value) {
      open.value = true
    } else {
      open.value = false
    
    }
  });


})


</script>
