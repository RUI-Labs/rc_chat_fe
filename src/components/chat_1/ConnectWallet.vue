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
              <DialogPanel class="w-full h-full flex justify-center items-center">
                <div class="w-full max-w-sm rounded-xl bg-white relative">

                    <button @click="hide()" class="absolute top-2 right-2 w-8 h-8 flex justify-center items-center bg-red-100 rounded-full active:scale-90 hover:bg-red-500 text-red-500 hover:text-white hover:ring-red-300 hover:ring-4 hover:ring-offset-4 duration-300">
                    <iconify-icon class=" text-xl" icon="material-symbols:close"></iconify-icon>
                  </button>

                  <div class="pt-8 pb-4 mt-4">
                    <h1 class="text-xl font-brand font-bold">Connect Wallet</h1>
                  </div>

                  <div class="p-4 space-y-3">
                    <button @click="_connect('io.metamask')" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-lg font-brand bg-blue-100 text-blue-500 font-bold">Metamask</button>
                    <button @click="_connect('io.rabby')" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-lg font-brand bg-blue-100 text-blue-500 font-bold">Rabby</button>
                    <button @click="_connect('coinbaseWalletSDK')" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-lg font-brand bg-blue-100 text-blue-500 font-bold">Coinbase Smart Wallet</button>
                    


                    <button @click="_connect('injected')" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-lg font-brand bg-blue-100 text-blue-500 font-bold">Injected Wallet</button>

                  </div>

                  <p class="mt-8 py-2">Sounds alien? Maybe you need a stamp.</p>
  
                  <div class="w-full px-4 pb-4" >
                    <button @click="createStamp()" class="active:scale-90 hover:bg-blue-500 hover:text-white hover:ring-blue-300 hover:ring-4 hover:ring-offset-4 duration-300 w-full rounded-md p-4 text-lg font-brand bg-blue-100 text-blue-500 font-bold">Create Stamp</button>
                  </div>

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
import { ref, onMounted, toRefs } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { $showWalletModal, $showNewStampModal } from "@/stores/stamp_1";

import { connect, reconnect, getAccount, disconnect, getConnectors, watchConnections } from '@wagmi/core';
import { config } from '@/wagmiConfig';

const open = ref(false);

const show = () => {
  open.value = true;
};

const hide = () => {
  open.value = false;
  $showWalletModal.set(false);
};

onMounted(() => {
  $showWalletModal.subscribe(() => {
    let value = $showWalletModal.get();
    if (value) show();
    else hide();
  });
});

const _connect = async (_connectorId) => {

  if(getAccount(config)?.address) {
    createStamp();
  } else {
    console.log("_connect wallet");
    const connector = getConnectors(config).find(x => x.id === _connectorId);
    console.log(connector)
    if(connector) {
  
      try {
        await connect(config, { connector });
        hide();
      } catch(error) {
        console.log(error);
        alert(`Wallet fail to connect : ${error?.message}`);
      }
  
    } else {
      alert("No wallet found.")
    }
  }


}

const createStamp = () => {
    $showNewStampModal.set(true);
    hide();
}

</script>
