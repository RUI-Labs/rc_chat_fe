
<template>
    <Dialog v-model:open="open">
      <DialogTrigger>
        <slot></slot>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Broadcast</DialogTitle>
          <DialogDescription>
            Broadcast a message to multiple users.
          </DialogDescription>
        </DialogHeader>
  
        <!--<div class="bg-yellow-50 rounded-xl flex justify-center items-center break-words p-4 pl-2">
          <iconify-icon class="text-yellow-500 text-3xl h-full aspect-square flex justify-center items-center" icon="mdi:lightbulb"></iconify-icon>
          <span class="text-yellow-600 font-brand">Web3 events of this token will be automatically captured to identify conversion</span>
        </div>-->

        <div class="border px-3 p-2 rounded-xl">
            <p>Broadcasting to {{ recipients?.length }} Users</p>
        </div>

  
        <div class="grid gap-4 py-4">
          <!-- <div class="grid grid-cols-4 items-center gap-4">
            <Label for="address" class="text-right">
              Name
            </Label>
            <Input v-model="inputAddress" id="address" class="col-span-3" />
          </div> -->
          <!-- <div class="">
            <Label for="name" class="text-right">
              Title
            </Label>
            <Input v-model="inputTitle" id="title" @input="prefillForm()" />
          </div>

          <div class="">
            <Label for="tag" class="text-right">
              Short Tag
            </Label>
            <Input v-model="inputTag" id="tag" />
            <p class="text-xs mt-2 font-light">user will be given this tag when they reply to this campaign</p>
          </div> -->


          <div class="">
            <div class="mb-2">
                <Label for="reply_message" class="text-left">
              Broadcast Message
            </Label>
            </div>
            <Textarea v-model="inputMessage"></Textarea>
          </div>
          
        </div>
        <DialogFooter>
          <Button @click="confirmBroadcast()">
            Broadcast
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, toRefs } from 'vue'
  import { Button } from '@/components/ui/button'
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { useDebounceFn } from '@vueuse/core'
  import { Textarea } from '@/components/ui/textarea'

  const props = defineProps({
    recipients: {
      type: Array,
      required: true,
    }
  });

  const { recipients } = toRefs(props);

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
  
  const inputTitle = ref('');
  const inputTag = ref('');
  const inputMessage = ref('');
  
//   const prefillForm = useDebounceFn(() => {
    
//     // dummy search 
//     // if(inputTitle.value == '') {
//     //     inputTag.value = '';
//     //     inputReplyMessage.value = '';
//     //     return
//     // }
//     // if(inputTag.value != '') return
  
//     inputTag.value = inputTitle.value.toLowerCase().replace(/ /g, '_');
//     inputReplyMessage.value = `Thank you for confirming your participation in ${inputTitle.value}.`
    
  
//   }, 300)
  
  const confirmBroadcast = () => {
    hide();
  }
  
  </script>
  