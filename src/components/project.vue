<template>

      <ConnectWallet />

      <br> <hr> <br>
      <h1>Create Project</h1>
      <form @submit.prevent="createProject()" class="w-full max-w-sm border rounded-xl grid grid-cols-6 mt-2 gap-2">
        <input :disabled="sendBusy" v-model="tokenAddress" class="col-span-5 p-4 rounded-xl" placeholder="enter message" type="text" />
        <button :disabled="sendBusy" type="submit" class="rounded-xl border p-1 px-2">Create</button>
      </form>
  <p>name: {{token.name}}</p>
  <p>symbol: {{token.symbol}}</p>
</template>

<script setup>

import ConnectWallet from "./ConnectWallet.vue";
import { computed, markRaw, onMounted, ref, watch } from "vue";
import { getAccount } from '@wagmi/core'
import { config } from "../wagmiConfig";

const tokenAddress = ref('');
const token = ref({
  name: "",
  symbol: "",
})

async function fetchTokenMetadata(tokenAddress) {
  return fetch('https://base-mainnet.g.alchemy.com/v2/cOI6YkiomPgpNGs89aF2LTMS50_vpRr2', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "id": 1,
      "jsonrpc": "2.0",
      "method": "alchemy_getTokenMetadata",
      "params": [
        tokenAddress
      ]
    })
  })
  .then(res => res.json())
  .then(res => res.result)
}

async function createProject() {

  let wallet = await getAccount(config);

  const project = await fetch('/api/projects.json', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      owner: wallet.address,
      token: tokenAddress.value
    })
  })
    .then(res => res.json())

  token.value = {
    name: project.token_name,
    symbol: project.token_symbol,
  }
}

</script>
