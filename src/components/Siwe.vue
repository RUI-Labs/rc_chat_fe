<template>
  <div class="w-full">
    <div v-if="!address" class="w-full flex flex-col space-y-2 justify-center items-center p-4">
      
      
      
      <!-- <button @click="_connect(connector)" class="rounded-md bg-bremo-700 border-bremo-600 border text-white p-4 w-full hover:bg-bremo-600 hover:ring-2 hover:ring-zinc-500 hover:ring-offset-2 duration-300" v-for="connector in connectors">{{ connector.name }}</button> -->
    



      <button @click="_connect('io.metamask')" class="rounded-md bg-bremo-700 border-bremo-600 border text-white p-4 w-full hover:bg-bremo-600 hover:ring-2 hover:ring-zinc-500 hover:ring-offset-2 duration-300">Metamask</button>
      <button @click="_connect('io.rabby')" class="rounded-md bg-bremo-700 border-bremo-600 border text-white p-4 w-full hover:bg-bremo-600 hover:ring-2 hover:ring-zinc-500 hover:ring-offset-2 duration-300">Rabby</button>
      <button @click="_connect('coinbaseWalletSDK')" class="rounded-md bg-bremo-700 border-bremo-600 border text-white p-4 w-full hover:bg-bremo-600 hover:ring-2 hover:ring-zinc-500 hover:ring-offset-2 duration-300">Coinbase Smart Wallet</button>
    


      <button @click="_connect('injected')" class="rounded-md bg-bremo-700 border-bremo-600 border text-white p-4 w-full hover:bg-bremo-600 hover:ring-2 hover:ring-zinc-500 hover:ring-offset-2 duration-300">Injected</button>
    

    </div>

    <div v-if="address"  class="w-full">
      <div class="w-full flex justify-between items-center mb-12 border-y border-bremo-800 bg-white/5 p-4 ">
        <div class="text-white">
          <p class="text-sm font-semibold">Connected</p>
          <p>{{ String(address).substr(0, 6) }}...{{ String(address).substr(-4) }}</p>
        </div>
        <Button variant="outline" class="bg-bremo-700 border-bremo-600 text-white" @click="_disconnect()">Disconnect</Button>
      </div>

      <div class="w-full p-2">
        <Button @click="startSIWE()" class="w-full bg-blue-500 hover:bg-blue-600 font-brand text-lg py-6">Sign In</Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { config } from "@/wagmiConfig";
import { connect, reconnect, getAccount, disconnect, getConnectors, watchConnections, signMessage } from "@wagmi/core";
import { Button } from "@/components/ui/button";

const connectors = ref();
const address = ref();

const checkAccount = async () => {
  try {
    let _address = getAccount(config);

    if (_address) {
      address.value = _address.address;
    }
  } catch (err) {}
};


onMounted(async () => {
  connectors.value = getConnectors(config);

  connectors.value = connectors.value.filter( _c => _c.id != "injected")

  await reconnect(config);
  await checkAccount();
});

const _connect = async (_connector) => {
  const connector = getConnectors(config).find(x => x.id === _connector);
  await connect(config, {
    connector,
  });

  await checkAccount();
};

const _disconnect = async () => {
  await disconnect(config);
  address.value = null;
};

const startSIWE = async () => {
  /// Get Nonce

  let { address:_account, chainId: _chainId} = getAccount(config)

  console.log(_chainId)

  // return

  let nonce_result = await fetch("/api/nonce.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: _account,
    }),
  });

  let { nonce } = await nonce_result.json();

  /// Init Sign Message

  // console.log(window.location.host)

  let prepare_message = (args) => {
    return `Domain: ${window.location.host}\nAddress: ${_account}\nStatement: Sign in with Ethereum to the app.\nURI: ${window.location.origin}\nVersion: 1\nChainId: ${_chainId}\nNonce: ${nonce}`;
  };

  const message = prepare_message({
    domain: window.location.host,
    address: _account,
    statement: "Sign in with Ethereum to the app.",
    uri: window.location.origin,
    version: "1",
    chainId: _chainId,
    nonce: nonce,
  });

  const signature = await signMessage(config, { message: message });

  let siwe_result = await fetch("/api/verify.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: _account,
      message: message,
      signature: signature,
    }),
  });

  if (siwe_result.ok) {
    let data = await siwe_result.json();
    // userData.value = data
    console.log(data);

    // toast({
    //   title: "Success",
    //   description: `Returning home as ${account.value.substring(0, 10)}...`,
    // });

    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 1000);

    window.location.href = "/admin";
  }

  // console.log(signature)
};


</script>
