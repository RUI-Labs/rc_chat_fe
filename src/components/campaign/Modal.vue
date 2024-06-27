<template>
  <div>
    <button @click="toggleModal()" class="bg-blue-50 text-blue-500 p-2 px-4 rounded-xl duration-300 hover:scale-90 hover:ring-2 hover:ring-blue-100 hover:ring-offset-2 active:scale-75">View</button>

    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex items-end justify-center text-center">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel :class="[stampStop?'bg-white/20':'bg-white']" class="relative transform overflow-hidden rounded-lg  shadow-xl transition-all w-screen h-screen">
                
               <!-- <div class="flex justify-center items-center flex-col w-full h-full" v-if="stampedCardImage">
                  <img class="w-[800px] border rounded-xl shadow-xl" ref="receiptImageEl" :src="stampedCardImage" alt="stamped card" />
                    
                  <div class="mt-4 w-full flex justify-center items-center">
                    <div class="w-full max-w-[800px] flex justify-end items-center">
                        <div class=" text-xl font-brand p-4 bg-white rounded-xl shadow-xl text-right w-[500px]">
                            <p>Hi, I'm Jesse. I've stamped your invitation: Giveaway of 50 USD worth of tokens</p>
                        </div>
                    </div>
                  </div>
                </div>-->

                
                
                  <main id="mainCard" class="w-full h-full min-h-full flex flex-col justify-center items-center bg-white relative">
                    <div class="w-full flex justify-start items-center p-2 absolute top-4 left-4">
                      <button @click="toggleModal()" class="p-2 px-6 text-xl bg-gray-200 rounded-xl mb-12 flex justify-center items-center duration-300 hover:scale-90 hover:ring-4 hover:ring-gray-100 hover:ring-offset-4">
                        <iconify-icon class="text-xl mr-4" icon="ep:back"></iconify-icon>
                        Back
                      </button>
                    </div>

                    <div class="w-full grid grid-cols-3 justify-center items-center">
                      <div class="p-4 px-8 col-span-2 relative h-full">
                        <h1 class="text-8xl font-brand font-semibold leading-[8rem] mb-12 text-left">{{ campaign_info.message }}</h1>

                        <div class="flex justify-start items-center space-x-4">
                          <p class="text-3xl">You're invited by</p>
                          <div class="bg-blue-500 rounded-full p-3 text-4xl flex justify-start items-center pr-6">
                            <div class="h-16 aspect-square bg-white rounded-full mr-2"></div>
                            <div class="text-white">{{ project_info.token_name }}</div>
                          </div>
                        </div>

                        <div>
                          <div v-if="noStamp" class="w-full fixed bottom-0 left-0 flex flex-col justify-start items-start p-8">
                            <div class="flex space-x-4 justify-start items-start">
                              <div class="flex justify-center items-center text-3xl bg-yellow-400/20 text-yellow-700 p-4 rounded-full">
                                <iconify-icon icon="ic:round-warning"></iconify-icon>
                                &nbsp;
                                <div>You don't have a stamp!</div>
                              </div>

                              <div class="flex justify-center items-center">
                                <NewStamper @update="updateStamp()">
                                  <button class="text-white bg-blue-500 rounded-xl px-8 py-4 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:ring-8 hover:ring-offset-4 duration-300 active:scale-90 text-3xl">Create my Stamp (Free)</button>
                                </NewStamper>
                              </div>
                            </div>
                          </div>

                          <template v-else>
                            <div ref="stampEl" :class="[zoomStamp ? 'scale-100' : 'scale-75', 'duration-300 transition-transform']" class="w-[300px] h-[300px] fixed z-40 bottom-0 left-0 pointer-events-none">
                              <div ref="stampCircleEl" v-if="!hideStamp">
                                <p>{{ $userData?.wallet_address }}</p>
                                <StampCircle :address="address" :name="name"></StampCircle>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>

                      <div class="w-full flex justify-center items-center p-12 pr-24 h-full">
                        <div style="cursor: none" ref="stampzoneEl" @click="confirmStamp()" :class="[stampStop ? 'bg-green-500 text-white' : 'hover:opacity-50']" class="w-full aspect-square border rounded-full flex justify-center items-center text-xl">
                          <p v-if="!stampStop">Stamp Here to Participate</p>
                          <!-- <iconify-icon v-if="stampStop" class="text-[10rem]" icon="zondicons:checkmark"></iconify-icon> -->
                          <svg v-if="stampStop" xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 24 24"><path fill="white" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" /></svg>
                        </div>
                      </div>
                    </div>
                  </main>
                
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
// import { CheckIcon } from "@heroicons/vue/24/outline";
// import Stamper from '@/components/Stamper.vue'

import { toPng } from "html-to-image";
import { $receiptImageData, $showReceipt, $userData, confirmStampAndSendMessage } from "@/stores/stamp"

const props = defineProps([ "project_info", "campaign_info" ]);
const { project_info, campaign_info } = toRefs(props);

const open = ref(false);

const toggleModal = () => {
  open.value = !open.value;
};

const address = ref()
const name = ref()

onMounted(() => {
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlCampaign = urlParams.get('campaign')
  console.log('urlCampaign', urlCampaign);

  if(campaign_info.value?.id == urlCampaign) {
    toggleModal();
  }
  
  $userData.subscribe(() => {
    console.log('$userData.value', $userData.value)
    address.value = $userData.value?.wallet_address;
    name.value = $userData.value?.name;
  })


})

import { watch, computed } from "vue";
import { Button } from "@/components/ui/button";
import NewStamper from "@/components/NewStamper.vue";

import StampCircle from "@/components/StampCircle.vue";

import { useMouseInElement } from "@vueuse/core";

const stampEl = ref(null);
const stampzoneEl = ref(null);
const zoomStamp = ref(false);

const { x, y, isOutside } = useMouseInElement(stampzoneEl);

const isOutsideChatBubble = ref(true);

const updateChatBubblePos = (ev) => {
  isOutsideChatBubble.value = ev;
};

const hideStamp = computed(() => {
  if (stampStop.value) return false;
  return !isOutsideChatBubble.value;
});

const stampStop = ref(false);

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

const noStamp = ref(true);

const stampedCardImage = ref(null);

const stampCircleEl = ref(null);

// const receiptImageEl = ref(null);

const confirmStamp = () => {
  if (noStamp.value) return;

  confirmStampAndSendMessage(project_info.value, campaign_info.value);

  stampStop.value = true;
  zoomStamp.value = true;
  //   console.log("Stamping...");

  // get the stampEl's style, but add as arbtirary tailwind class
  // let stampElTop = stampEl.value.style.top;
  // let stampElLeft = stampEl.value.style.left;

  // stampCircleEl.value.classList.add('fixed', `top-[${stampElTop}px]`, `left-[${stampElLeft}px]` , 'pointer-events-none');

  let node = document.getElementById("mainCard");
  toPng(node)
    .then((dataUrl) => {
      var img = new Image();
      img.src = dataUrl;
      // document.body.appendChild(img);
      stampedCardImage.value = dataUrl;

        $receiptImageData.set(dataUrl)
        $showReceipt.set(true)

        open.value = false
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });

  // toast({
  //       title: 'Confirmed!',
  //       description: 'Jesse had made to the list for: [Giveaway 50 usd of token]',
  //     });
};

const updateStamp = () => {
  noStamp.value = false;
};
</script>
