<template>
  <div class="w-full">
    <div v-if="!address" class="w-full flex flex-col space-y-2 justify-center items-center">
      <button @click="_connect(connector)" class="rounded-md border px-4 py-2 w-full" v-for="connector in connectors">{{ connector.name }}</button>
    </div>

    <div v-if="address"  class="w-full">
      <div class="w-full flex justify-between items-center mb-12">
        <p>Connected: {{ String(address).substr(0, 6) }}...{{ String(address).substr(-4) }}</p>
        <Button variant="outline" @click="_disconnect()">Disconnect</Button>
      </div>

      <Button @click="startSIWE()" class="w-full">Sign In</Button>
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
    let _address = await getAccount(config);

    if (_address) {
      address.value = _address.address;
    }
  } catch (err) {}
};

onMounted(async () => {
  connectors.value = getConnectors(config);

  await reconnect(config);
  await checkAccount();
});

const _connect = async (connector) => {
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

  let { address:_account, chainId: _chainId} = await getAccount(config)

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
