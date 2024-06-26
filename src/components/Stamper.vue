<template>
  <div>

    <!-- <ChatBubble @update="updateChatBubblePos" ref="chatbubbleEl"></ChatBubble> -->

    <!--<Teleport to="#stampzone">
      <div style="cursor: none;" ref="stampzoneEl" @click="confirmStamp()" :class="[stampStop?'bg-green-500 text-white':'hover:opacity-50']" class="w-full aspect-square border rounded-full flex justify-center items-center text-xl ">
        <p v-if="!stampStop">Stamp Here to Participate</p>
        <iconify-icon  v-if="stampStop" class="text-[10rem]" icon="zondicons:checkmark"></iconify-icon>
      </div>

    </Teleport>-->

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
      <div ref="stampEl" :class="[zoomStamp ? 'scale-125' : 'scale-75', 'duration-300 transition-transform']" class="w-[300px] h-[300px] fixed z-40 bottom-0 left-0 pointer-events-none">
        <StampCircle v-if="!hideStamp" address="0xcB35ed9B8a830fA472931cc63a62793910c59270" name="jesse"></StampCircle>
      </div>
      <Toaster />
    </template>

  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { Button } from "@/components/ui/button";
import NewStamper from "./NewStamper.vue";

import StampCircle from "./StampCircle.vue";

import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const { toast } = useToast()

import { useMouseInElement } from "@vueuse/core";

import ChatBubble from "./ChatBubble.vue";

const stampEl = ref(null);
const stampzoneEl = ref(null);
const zoomStamp = ref(false);

const { x, y, isOutside } = useMouseInElement(stampzoneEl);

const isOutsideChatBubble = ref(true);

const updateChatBubblePos = (ev) => {
  isOutsideChatBubble.value = ev
};

const hideStamp = computed( () => {
  if(stampStop.value) return false;
  return !isOutsideChatBubble.value;
})

const stampStop = ref(false);

watch(x, (newX) => {
  if(stampStop.value) return;
  if (stampEl.value == null) return;

  if(isOutside.value) {
    stampEl.value.style.left = `${newX}px`;
  } else {
    stampEl.value.style.left = `${newX - 150}px`;
  }

});

watch(y, (newY) => {
  if(stampStop.value) return;
  if (stampEl.value == null) return;

  if(isOutside.value) {
    stampEl.value.style.top = `${newY}px`;
  } else {
    stampEl.value.style.top = `${newY - 150}px`;
  }
  // stampEl.value.style.top = `${newY - 150}px`;
});

watch(isOutside, () => {
  if(stampStop.value) return;
  zoomStamp.value = !isOutside.value;
});

const noStamp = ref(true);

const confirmStamp = () => {

  if(noStamp.value) return;

  stampStop.value = true;
  zoomStamp.value = true;
  console.log("Stamping...");

  // toast({
  //       title: 'Confirmed!',
  //       description: 'Jesse had made to the list for: [Giveaway 50 usd of token]',
  //     });

};

const updateStamp = () => {
  noStamp.value = false;
};

defineExpose({
  stampStop,
  confirmStamp
})
</script>
