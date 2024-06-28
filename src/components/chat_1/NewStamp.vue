<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-[53]">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-[54] w-screen h-screen">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="w-screen h-screen bg-gradient-to-b from-blue-500 to-blue-800 flex justify-center items-center">

                <button @click="hide()" class="bg-white w-14 h-14 absolute top-4 right-4 z-[55] rounded-full flex justify-center items-center shadow-xl active:scale-90 hover:bg-red-500 text-red-500 hover:text-white hover:ring-red-300 hover:ring-4 hover:ring-offset-4 duration-300">
                  <iconify-icon class=" text-4xl" icon="material-symbols:close"></iconify-icon>
                </button>

                <div ref="page_1" v-if="page == 1" class="flex flex-col justify-center items-center">
                  <p id="text1-1" class="max-h-0 overflow-hidden text-white font-brand text-5xl mb-4">Let's make a new stamp!</p>

                  <p id="text1-2" class="max-h-0 overflow-hidden text-white font-brand text-5xl">Connect your Wallet</p>

                  <div id="text1-3" class="max-h-0 overflow-hidden w-full flex justify-center items-center flex-col">

                    <div class="w-full max-w-sm space-y-4 mt-8">
                      <button @click="connectWallet()" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-xl font-brand bg-white">Metamask</button>
                      <button @click="connectWallet()" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-xl font-brand bg-white">Rabby</button>
                      <button @click="connectWallet()" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-xl font-brand bg-white">Coinbase Smart Wallet</button>
                    </div>
  
                    <p class="text-white text-xl py-8">or create a new wallet ;)</p>
  
                    <div class="w-full max-w-sm" >
                      <button @click="createWallet()" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-xl font-brand bg-white">Create New Wallet</button>
                      <p class="text-white mt-2" >with Coinbase Smart Wallet</p>
                    </div>

                  </div>



                </div>

                <div ref="page_1_5" id="page1_5" v-if="page == 1.5" >

                  <div class="flex justify-center items-center mb-12">
                    <iconify-icon id="text1-5-wallet" class="text-8xl text-white absolute opacity-0" icon="material-symbols:wallet"></iconify-icon>
                    <iconify-icon id="text1-5-tick" class="text-8xl text-white absolute opacity-0 scale-0" icon="hugeicons:tick-04"></iconify-icon>
                  </div>

                  <p id="text1-5-1" class="max-h-0 overflow-hidden text-white font-brand text-5xl mb-4">Connected</p>

                  <p id="text1-5-2" class="max-h-0 overflow-hidden text-xl text-white">0xcB35ed9B8a830fA472931cc63a62793910c59270</p>


                </div>

                <div ref="page_2" id="page2" v-if="page == 2" class="scale-0 opacity-0 flex flex-col justify-center items-center">
                  <p class="text-white font-brand text-5xl mb-4">What's your name?</p>

                  <p class="text-white font-brand text-3xl mb-2">A simple one would do</p>
                  <p class="text-white font-brand">(like the one you tell in Starbucks)</p>

                  <input v-model="nameInput" placeholder="Name the next billionare..." class="mt-8 mb-12 text-white placeholder:text-white placeholder:text-opacity-30 text-3xl w-full bg-transparent  border-b py-2 border-b-white rounded-none focus:outline-none text-center">
                 
                  <button @click="confirmName()" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-xl font-brand bg-white">My name is {{ nameInput ? nameInput : '...' }} </button>
                </div>

                <div v-if="page == 3" class="flex flex-col justify-center items-center">
                  <p class="text-white font-brand text-5xl mb-4">Turn on notifications</p>

                  <p class="text-white font-brand text-3xl mb-2">We might need to announce a winner</p>
                  
                  <div class="p-8 aspect-square bg-white/10 flex justify-center items-center flex-col space-y-4 my-4 rounded-xl text-center">
                    <button @click="requestNotification()" class="w-28 h-28 bg-white rounded-full active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 group">
                      <iconify-icon class="text-black text-5xl group-hover:text-white animate-bounce" icon="mdi:bell-plus"></iconify-icon>
                    </button>
                    <p class="text-white">Tap to Request Permission</p>
                  </div>

                </div>

                <div v-if="page == 3.5" class="flex flex-col justify-center items-center">
                  <p class="text-white font-brand text-5xl mb-4">Please press <strong class="underline">Allow</strong> </p>
                </div>

                <div v-if="page == 4" class="flex flex-col justify-center items-center">
                  <p class="text-white font-brand text-5xl mb-4">Your stamp is ready!</p>
                  <p class="text-white font-brand text-3xl mb-2">Now you can stamp all invitations.</p>

                  <p class="text-white font-brand mt-8 mb-2">This stamp is yours forever. To restore this stamp, just connect your wallet.</p>

                  <div class="w-full flex justify-center items-center py-12">
                    <StampCircle :address="`0xcB35ed9B8a830fA472931cc63a62793910c59270`" :name="`Jay`" ></StampCircle>
                  </div>


                  <button @click="completeStamp()" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 px-12 font-bold rounded-md p-4 text-xl font-brand bg-white">Nice!</button>

                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";

import { $showNewStampModal } from "@/stores/stamp_1";
import { Input } from '@/components/ui/input'

import StampCircle from "../StampCircle.vue";
import anime from "animejs/lib/anime.es.js";

const page = ref(0);

const open = ref(false);

const nameInput = ref('');

const page_1 = ref()
const page_1_5 = ref()
const page_2 = ref()

watch(page_1, async (value) => {
  // console.log('page_1', value)
  console.log(document.getElementById('1_1'))

  // await new Promise((resolve) => {
  //   setTimeout( () => {
  //     resolve()

  //   }, 2000)
  // })

  let tl = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 300,
  })

  tl.add({
    targets: '#text1-1',
    maxHeight: '3rem',
  })

  tl.add({
    targets: '#text1-2',
    maxHeight: '3rem',
    delay:200
  })

  tl.add({
    targets: '#text1-3',
    maxHeight: '30rem',
    delay:500,
    duration: 600
  })


  
})

watch(page_1_5, async (value) => {

  let tl = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 300,
  })

  tl.add({
    targets: '#text1-5-wallet',
    opacity: 1,
    translateY: 30,
  })

  tl.add({
    targets: '#text1-5-wallet',
    opacity: 1,
    translateY: 0,
  })

  tl.add({
    targets: '#text1-5-1',
    maxHeight: '3rem',
    delay: 100
  })

  tl.add({
    targets: '#text1-5-2',
    maxHeight: '3rem',
    delay:200
  })

  tl.add({
    targets: '#text1-5-wallet',
    rotate: 360,
    scale:0,
    opacity: 0,
    // easing: 'spring(1, 80, 10, 0)'
  })

  tl.add({
    targets: '#text1-5-tick',
    rotate: 360,
    scale:1,
    opacity: 1,
    easing: 'spring(1, 80, 10, 0)'
  },'-=150')

  tl.add({
    targets: '#page1_5',
    scale: 0.9,
    opacity: 0,
  })

  tl.complete = () => {
    page.value = 2;
  }

})

watch(page_2, async (value) => {

  let tl = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 300,
  })

  console.log('page2', value)

  tl.add({
    targets: '#page2',
    scale: 1,
    opacity: 1,
  })

})

onMounted(() => {
  $showNewStampModal.subscribe(() => {
    let value = $showNewStampModal.get();
    // // open.value = $showNewStampModal.get()
    // open.value = value
    // console.log('open', value)
    if (value) show();
    else hide();
  });

});

const show = () => {
  open.value = true;
  page.value = 1;
};

const hide = () => {
  page.value = 1;
  $showNewStampModal.set(false);
  open.value = false;
};


const connectWallet = () => {
  console.log("connectWallet");
  page.value = 1.5;
};

const createWallet = () => {
  console.log("createWallet");
  page.value = 2;
};

const confirmName = () => {
  page.value = 3;
}

const requestNotification = () => {
  page.value = 3.5;

  //dummy

  setTimeout(() => {
    allowNotification();
  }, 1000);
}

const allowNotification = () => {
  page.value = 4;
}

const completeStamp = () => {
  hide();
}

</script>
