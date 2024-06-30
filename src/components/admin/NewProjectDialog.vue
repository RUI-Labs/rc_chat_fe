
<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>New Project</DialogTitle>
        <DialogDescription>
          Create a new project by filling out the form below. 
        </DialogDescription>
      </DialogHeader>

      <div class="bg-yellow-50 rounded-xl flex justify-center items-center break-words p-4 pl-2">
        <iconify-icon class="text-yellow-500 text-3xl h-full aspect-square flex justify-center items-center" icon="mdi:lightbulb"></iconify-icon>
        <span class="text-yellow-600 font-brand">Web3 events of this token will be automatically captured to identify conversion</span>
      </div>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="address" class="text-right">
            Token Address
          </Label>
          <Input  @input="searchAddress()" v-model="inputAddress" id="address" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">
            Name
          </Label>
          <Input v-model="inputName" id="name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="symbol" class="text-right">
            Symbol
          </Label>
          <Input v-model="inputSymbol" id="symbol" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button @click="confirmCreateProject()">
          Create Project
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, toRefs, computed, h, ref } from "vue";
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDebounceFn } from '@vueuse/core'

import { $xmtpClient } from "@/stores/admin";
let xmptClient = $xmtpClient.get()

const open  = ref(false);

const show = () => {
  open.value = true;
};

const hide = () => {
  open.value = false;
};

defineExpose({
  show,
  hide,
});

const props = defineProps(["wallet"]);
const { wallet } = toRefs(props);
const inputAddress = ref('');
const inputName = ref('');
const inputSymbol = ref('');

const searchAddress = useDebounceFn(async () => {
        const metadata = await fetch(`/api/token.json?token=${inputAddress.value}`)
                .then(res => res.json() )
  
  // dummy search 

  inputName.value = metadata.name;
  inputSymbol.value = metadata.symbol;

}, 300)

const confirmCreateProject = async () => {

  await fetch(`/api/projects.json`, {
         method: "POST",
         headers: {
                 'content-type': "application/json"
         },
         body: JSON.stringify({
                 token_name: inputName.value,
                 token_address: inputAddress.value.toLowerCase(),
                 token_symbol: inputSymbol.value,
                 owner_address: wallet.value.toLowerCase() 

         })
  })

  hide();

  window.location.href = `/admin/project/${inputSymbol.value}`
}

</script>
