<template>
  <div class="w-full h-full">

    <template v-if="address">

        <Teleport to="#userlist">
          <div class="w-full divide-y pb-[20vh]">
            <div v-for="i in 20" class="w-full grid grid-cols-2 gap-2 justify-center items-center duration-300 hover:bg-gray-100 p-2">
              <p class="font-brand font-semibold pl-2 pt-3">Peter Lorem Ipsum</p>
              <p class="text-sm text-right pr-2 pt-2">0x1234123</p>
    
              <div class="flex justify-start items-center space-x-2 col-span-full pb-2 pl-1">
                <div v-for="i in 3" class="text-xs border px-2 py-1 rounded-full bg-white">Tag {{ i }}</div>
    
                <button class="bg-white text-xs border px-2 py-1 rounded-full">+ 4</button>
              </div>
            </div>
            <div class="w-full border-t text-center pt-2">
              <p class="text-sm italic text-gray-500">-- Even good things will come to an end. --</p>
            </div>
          </div>
        </Teleport>
    
        <Teleport to="#chatBox">
    
            <div class="w-full grid grid-cols-1 grid-rows-[auto_1fr_auto] h-full justify-center items-center">
                
                <div class="w-full border-b p-4 pb-2 grid grid-cols-3 justify-center items-center sticky top-0 bg-white">
        
                    <p>Peter Lorem Ipsum</p>
                    <p class="text-sm col-span-2 text-right">Tags</p>
                    
                    <p class="font-mono text-sm text-gray-500">0x1234123</p>
        
                    <div class="col-span-2 flex flex-col justify-center items-end">
                    <div class="flex flex-wrap gap-2  justify-start items-center">
                        
        
                        <div v-for="i in 3" class="text-xs border px-2 py-1 rounded-full">Tag {{ i }}</div>
        
                    </div>
                    </div>
        
                </div>
        
                <div class="w-full h-full space-y-4 flex flex-col justify-end p-4">
                
                <div v-for="message in messages" class="w-full flex px-2" :class="[getDirection(message.sender)]">
                    <div :class="[getDirection(message.sender)]">
                        <p :class="[authorDirection(message.sender),'w-full']">{{ message.sender }}</p>
                        <template v-if="message.type == 'text'">
                            <div class="p-2 px-3 border rounded-xl">
                                {{ message.content }}
                            </div>
                        </template>
        
                        <template v-if="message.type == 'media'">
                            <div class="w-[100px] h-[100px] border rounded-md">
                                <!-- {{ message.content }} -->
                            </div>
                        </template>
                    </div>
                </div>
        
            </div>
        
           
        
            </div>
    
        </Teleport>
    
        <form @submit.prevent="sendMessage()" class="w-full border-t border-t-gray-200 grid grid-cols-[1fr_auto] justify-center items-center p-2">
                
                <div class="">
                    <input v-model="messageInput" ref="sendMessageinput" type="text" class="w-full h-full py-4 px-4 focus-visible:outline-none" placeholder="Type a message...">
                </div>
                <button type="submit" class="w-12 h-12 flex justify-center items-center bg-green-500 shadow-md text-white rounded-xl hover:shadow-sm duration-300 hover:ring-2 hover:ring-green-500 hover:scale-90 active:scale-75 hover:ring-offset-2">
                    <iconify-icon class="text-2xl" icon="fluent:send-28-filled"></iconify-icon>
                </button>
        
            </form>
    </template>

    <template v-else>

        <Teleport to="#chatBox">

            <div class="w-full flex justify-center items-center h-full">
                <div v-for="connector of connectors">
                <button @click="selectConnector(connector)" class="border p-2 rounded-xl">{{ connector.name }}</button>
            </div>
            </div>
        </Teleport>



    </template>


  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { connect, reconnect, getAccount, disconnect, getConnectors, watchConnections } from '@wagmi/core';
import { config } from '@/wagmiConfig';

const address = ref()
const connectors = ref()

const selectConnector = async (connector) => {
    await connect(connector, config)
}

const checkAccount = async () => {
        try {
            let _address = await getAccount(config)

            if (_address) {
                address.value = _address.address
            }
        }catch(err){}
    }
    let unwatch;

onMounted( async () => {
    // console.log('aaa')
    connectors.value = getConnectors(config);
    // console.log(connectors.value)

    unwatch = watchConnections(config, {
        onChange(data) {
            let _account =  getAccount(config)
            console.log(_account)
            address.value = _account.address;
        },
    })
    await reconnect(config)

    await checkAccount()

})


const messages = [
    {
        type:'text',
        content:'Hello, how can I help you today?',
        sender:'Yao',
    },
    {
        type:'text',
        content:'I need help with my account',
        sender:'me',
    },
    {
        type:'text',
        content:'Sure, what seems to be the problem?',
        sender:'Yao',
    },
    {
        type:'text',
        content:'Hello, how can I help you today?',
        sender:'Yao',
    },
    {
        type:'text',
        content:'I need help with my account',
        sender:'me',
    },
    {
        type:'text',
        content:'Sure, what seems to be the problem?',
        sender:'Yao',
    },
    {
        type:'text',
        content:'Hello, how can I help you today?',
        sender:'Yao',
    },
    {
        type:'text',
        content:'I need help with my account',
        sender:'me',
    },
    {
        type:'text',
        content:'Sure, what seems to be the problem?',
        sender:'Yao',
    },{
        type:'text',
        content:'Hello, how can I help you today?',
        sender:'Yao',
    },
    {
        type:'text',
        content:'I need help with my account',
        sender:'me',
    },
    {
        type:'text',
        content:'Sure, what seems to be the problem?',
        sender:'Yao',
    },
    {
        type:'media',
        // content:'I can\'t seem to login',
        sender:'me',
    },
]
const authorDirection = (sender) => {
    return sender === 'me' ? 'text-right' : 'text-left'
}
const getDirection = (sender) => {
    return sender === 'me' ? 'flex-row-reverse' : 'flex-row'
}

const messageInput = ref('')
const sendMessage = () => {
    messageInput.value = ''
}

</script>
