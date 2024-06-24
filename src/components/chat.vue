<template>
  <div>
    <ConnectWallet />
    <!-- <button @click="initXmtp()">init xmtp</button> -->

    <p>{{ busy }}</p>
    <p>{{ statusText }}</p>

    <div class="w-full flex justify-center items-center mb-4">
      <div class="w-full max-w-sm">
        <p>Receipient:</p>
        <input v-model="recipientAddress" class="border rounded-xl w-full p-4" placeholder="enter recipient address" type="text" />
      </div>
    </div>

    <div class="w-full flex justify-center items-center flex-col">
      <div class="w-full max-w-sm border rounded-xl p-4 h-[500px] overflow-y-auto">
        <div class="space-y-1">
          <div :class="[getDirection(message), 'w-full flex']" v-for="message in messages">
            <div class="max-w-[40%] border rounded-md p-1 px-2">{{ message.content }}</div>
          </div>
        </div>

        <div ref="spacer" class="w-full h-1"></div>

      </div>

      <form @submit.prevent="sendMessage()" class="w-full max-w-sm border rounded-xl grid grid-cols-6 mt-2 gap-2">
        <input :disabled="sendBusy" v-model="message" class="col-span-5 p-4 rounded-xl" placeholder="enter message" type="text" />
        <div class="flex justify-center items-center w-full pr-2">
          <button :disabled="sendBusy" type="submit" class="rounded-xl border p-1 px-2">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, markRaw, onMounted, ref, watch } from "vue";

import ConnectWallet from "./ConnectWallet.vue";

import { getEthersSigner } from "../utils/getEthersSigner";

import { Client } from "@xmtp/xmtp-js";
import { loadKeys, storeKeys } from "../utils/keyStorage";

import { reconnect, getAccount, watchConnections } from "@wagmi/core";
import { config } from "../wagmiConfig";

const address = ref();

const recipientAddress = ref("0xCaFE1246df2B91336A87b655247Bd91086632518");
const message = ref();

const xmtpClient = ref();
const conversations = ref();
const messages = ref();

const busy = ref(true);
const statusText = ref("Initializing...");

const sendBusy = ref(false);
const spacer = ref();

const tryInitXmtp = async () => {
  let _address = await getAccount(config);

  if (_address.address != undefined) {
    await initXmtp();
  } else {
    conversations.value = [];
    messages.value = [];
    statusText.value = "Please connect your wallet";
  }
};

onMounted(async () => {
  watchConnections(config, {
    async onChange(data) {
      await tryInitXmtp();
    },
  });

  await tryInitXmtp();
});

const getSigner = async () => {
  try {
    let signer = await getEthersSigner(config);
    // let _s = await signer.getSigner()
    let _s = await signer.provider.getSigner();
    console.log(_s)
    return _s;
  } catch (err) {
    console.log(err);
  }
};

const initXmtp = async () => {

    statusText.value = "Initializing xmtp...";
  let signer = await getSigner();

    console.log(signer.address);
  address.value = signer?.address;

  const clientOptions = {
    env: "production",
  };

  let _address = signer.address;

  let keys = loadKeys(_address);

  if (!keys) {
    keys = await Client.getKeys(signer, {
      ...clientOptions,
    });
    storeKeys(_address, keys);
  }
  const xmtp = await Client.create(null, {
    ...clientOptions,
    privateKeyOverride: keys,
  });

  console.log(xmtp);

  // const xmtp = await Client.create(signer, {
  //     env: "production"
  // });
  // console.log(xmtp);
  xmtpClient.value = markRaw(xmtp);
  conversations.value = await xmtpClient.value.conversations.list();

  console.log(conversations.value);

  // check if the recipient address is in the list of conversations
  let exists = conversations.value.find((c) => c.peerAddress === recipientAddress.value);

  console.log(exists);

  if(!exists){
      await xmtpClient.value.conversations.newConversation(recipientAddress.value);
      await fetchMessages();

    //   conversations.value = await xmtpClient.value.conversations.list();
  }

  await fetchMessages();
};

const sendMessage = async () => {

    sendBusy.value = true;

  let _message = message.value;
  message.value = undefined;

  try {
    const conversation = await xmtpClient.value.conversations.newConversation(recipientAddress.value);
    let result = await conversation.send(_message);
    console.log(result);
  } catch (err) {}

  sendBusy.value = false;
};

// const selectedConversation = computed(() => {
// //   return xmtpClient.value?.conversations?.selectedConversation;

//     return conversations.value.find( c => c.peerAddress === recipientAddress.value)
// });

const fetchMessages = async () => {

    statusText.value = "Loading conversation...";

  messages.value = [];

  let selectedConversation = conversations.value.find((c) => c.peerAddress === recipientAddress.value);

  if (selectedConversation) {
    let _message = await selectedConversation.messages();
    console.log(_message);

    messages.value = _message.map((m) => {
      return {
        content: m.content,
        id: m.id,
        senderAddress: m.senderAddress,
      };
    });

    statusText.value = "All Good!";
    busy.value = false;

    scrollToBottom();

    for await (const message of await selectedConversation.streamMessages()) {
      //   if (message.senderAddress === address.value) {
      //     // This message was sent from me
      //     continue;
      //   }
      //   console.log(`New message from ${message.senderAddress}: ${message.content}`);
      const exists = messages.value.find((m) => m.id === message.id);

      if (!exists) {
        messages.value.push({
          content: message.content,
          id: message.id,
          senderAddress: message.senderAddress,
        });
      }

      scrollToBottom();
    }

    // console.log(selectedConversation)

    // await streamMessages()


  }
};

watch(conversations, async () => {
  await fetchMessages();
});

const scrollToBottom = () => {
    if(spacer?.value){
        spacer.value.scrollIntoView({ behavior: "smooth" });
    }
};

const getDirection = (message) => {
  if (message.senderAddress === address.value) {
    return "justify-end text-right";
  } else {
    return "justify-start text-left";
  }
};
</script>
