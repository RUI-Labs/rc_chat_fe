<template>

      <ConnectWallet />

      <br> <hr> <br>
      <h1>Create Campaign</h1>
      <form @submit.prevent="createCampaign()" class="w-full max-w-sm border rounded-xl grid grid-cols-6 mt-2 gap-2">
        <input :disabled="sendBusy" v-model="campaignTag" class="col-span-5 p-4 rounded-xl" placeholder="enter campaign tag" type="text" />
        <input :disabled="sendBusy" v-model="campaignMessage" class="col-span-5 p-4 rounded-xl" placeholder="enter campaign message" type="textarea" />
        <button :disabled="sendBusy" type="submit" class="rounded-xl border p-1 px-2">Create</button>
      </form>

      <h1>List of campaigns</h1>

    <table class="table-auto w-full mb-6">
        <thead class="bg-blue-200">
            <tr>
                <th class="px-4 py-2">ID</th>
                <th class="px-4 py-2">Tag</th>
                <th class="px-4 py-2">Message</th>
            </tr>
        </thead>
        <tbody class="bg-white">
            <tr v-for="item in campaigns" :key="item.id" class="hover:bg-blue-100">
                <td class="border px-4 py-2">{{ item.id }}</td>
                <td class="border px-4 py-2">{{ item.tag }}</td>
                <td class="border px-4 py-2">{{ item.message }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>

import ConnectWallet from "./ConnectWallet.vue";
import { computed, markRaw, onMounted, ref, watch } from "vue";
import { getAccount, watchConnections } from '@wagmi/core'
import { config } from "../wagmiConfig";
const campaignTag = ref('');
const campaignMessage = ref('');
const  campaigns = ref([])

const props = defineProps(['projectId'])

onMounted(async () => {
        campaigns.value = await getProjectCampaigns()
  // await tryInitXmtp();
});

async function getProjectCampaigns() {
        const campaigns = await fetch(`/api/projects/${props.projectId}/campaigns.json`)
        .then(res => res.json())
        return campaigns
}

async function createCampaign() {

  let wallet = await getAccount(config);

  const campaign = await fetch('/api/campaigns.json', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      project_id: props.projectId,
      tag: campaignTag.value,
      message: campaignMessage.value
    })
  })
    .then(res => res.json())

  campaignTag.value = campaign.tag
  campaignMessage.value = campaign.message
}

</script>
