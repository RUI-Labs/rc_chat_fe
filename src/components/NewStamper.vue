<template>
  <div class="">
    <Dialog v-model:open="open">
      <DialogTrigger as-child>
        <slot @click="open = false"></slot>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader></DialogHeader>
        <VisuallyHidden>
          <DialogTitle>Edit profile</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </VisuallyHidden>

        <div>
          <h4 class="sr-only">Status</h4>
          <!-- <p class="text-sm font-medium text-gray-900">Migrating MySQL database...</p> -->
          <div class="mt-6" aria-hidden="true">
            <div class="overflow-hidden rounded-full bg-gray-200">
              <div class="h-2 rounded-full bg-indigo-600" :style="[page==0?'width:0%;':'',page==1?'width:50%;':'']" />
            </div>
            <div class="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
              <div :class="[page==0?'text-blue-500':'']" class="text-left">Name</div>
              <div :class="[page==1?'text-blue-500':'']" class="text-center">Wallet</div>
              <div :class="[page==2?'text-blue-500':'']" class="text-right">Notification</div>
              <!-- <div class="text-right">Deployed</div> -->
            </div>
          </div>
        </div>

        <template v-if="page == 0">
          <h1 class="text-xl font-brand font-bold mt-8">What's your name?</h1>
          <p class="mb-2">Keep it short and simple ;)</p>
          <Input v-model="nameInput" type="text" placeholder="Example: Jesse" />
  
          <Button @click="nextPage()">Next</Button>
        </template>

        <template v-if="page == 1">
          <h1 class="text-xl font-brand font-bold mt-8 text-center">Connect your wallet</h1>
          
          <div class="w-full flex flex-col">
            <div  v-for="wallet in walletOptions" class="w-full py-1">
              <Button @click="createWallet(wallet)" class="w-full font-brand font-bold text-blue-500 border-blue-500" variant="outline">{{ wallet.name }}</Button>
            </div>
          </div>

          <hr>

          <h1 class="text-center font-brand font-semibold">Or Create One (free!)</h1>
  
          <Button @click="createNewWallet()" class="bg-blue-500">Create</Button>
        </template>

        <template v-if="page == 2">
          <h1 class="text-xl font-brand font-bold mt-8">Notifications</h1>
          <p class="mb-2">Please allow us to send you notifications</p>
  
          <div class="flex space-x-4">
            <Button class="w-full bg-blue-500" @click="allowNotification()">Allow</Button>
            <Button variant="outline" class="w-full" @click="nextPage()">Deny</Button>
          </div>
          <!-- <Button @click="nextPage()">Save</Button> -->
        </template>

        <template v-if="page == 3">
          <h1 class="text-xl font-brand font-bold mt-8 text-center">Collect your stamp!</h1>
          <p class="mb-2 text-center">You're all set up and ready to go!</p>

          <div class="w-full h-full flex justify-center items-center mb-4">

            <!-- <div class="w-[250px] h-[250px] rounded-full border"></div> -->
            <StampCircle address="0xcB35ed9B8a830fA472931cc63a62793910c59270" name="jesse"></StampCircle>
          </div>
  
          <Button @click="nextPage()">Collect Stamp</Button>
        </template>

      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>

import { computed, markRaw, onMounted, ref, watch } from "vue";
import { reconnect, getAccount, watchConnections, disconnect, getConnectors, connect } from "@wagmi/core";
import { config } from "@/wagmiConfig";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "radix-vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import StampCircle from "./StampCircle.vue";

const open = ref(false);
const emit = defineEmits(['update']);



const page = ref(0)

const nextPage = () => {
  if (page.value == 3) {
    open.value = false;
    emit('update');
    return;
  }
  page.value += 1;
};

const createWallet = async (_wallet) => {
  console.log("createWallet", _wallet)
  const connected = await connectWallet(_wallet);
  if(connected) nextPage();
};

const connectWallet = async (_connector) => {

  const connectors = getConnectors(config);
  const selectedConnector = connectors?.find((connector) => connector?.id === _connector?.id);

  if(selectedConnector) {
    try {
      await connect(config, { connector: selectedConnector })
      return true;
    } catch(error) {
      console.log('connectWallet', error);
      return false;
    }
  }

  return false;

}

const createNewWallet = () => {
  nextPage();
};





// let walletOptions = [
//   {
//     name: "Coinbase Smart Wallet",
//     id: "coinbaseWalletSDK"
//   },
//   {
//     name: "Metamask",
//     id: "io.metamask"
//   },
//   {
//     name: "Rabby Wallet",
//     id: "io.rabby"
//   },
// ];
const walletOptions = ref([])
let unwatch;
onMounted( async () => {

  console.log(getConnectors(config))
  walletOptions.value = getConnectors(config).filter(x => x.id !== "injected" && x.id !== "coinbaseWalletSDK");
  walletOptions.value.push({
    name: "Coinbase Smart Wallet",
    id: "coinbaseWalletSDK"
  })

  await reconnect(config);
  if((getAccount(config))?.address) emit("update");

  unwatch = watchConnections(config, {

    async onChange(data) {
        const _account =  getAccount(config);
        console.log("onChange wallet", _account);

        if(_account?.address) {

          emit('update');

        }

    }

  })

})


const nameInput = ref();


const allowNotification = async () => {



  nextPage();

}

</script>
