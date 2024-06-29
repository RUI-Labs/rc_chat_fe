
<template>
    <Dialog v-model:open="open">
      <DialogTrigger>
        <slot></slot>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
          <DialogDescription>
            Send a message to a user.
          </DialogDescription>
        </DialogHeader>
  
  
        <div class="grid gap-4 py-4">
          <div class="">
            <Label for="address" class="text-left">
              Address
            </Label>
            <Input  @input="validateAddress()" v-model="inputAddress" id="address" class="col-span-3" />
          </div>
          

          <div class="">
            <Label for="reply_message" class="text-right">
              Reply Message
            </Label>
            <Textarea v-model="inputMessage"></Textarea>
          </div>


        </div>
        <DialogFooter>
          <Button @click="confirmSend()">
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { useDebounceFn } from '@vueuse/core'
  import { Textarea } from '@/components/ui/textarea'

  
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
  
  const inputAddress = ref('');
  const inputMessage = ref('');
  
  const validateAddress = useDebounceFn(() => {
    
    // can check here if the user provided a valid address
  
  }, 300)
  
  const confirmSend = () => {
    hide();
  }
  
  </script>
  