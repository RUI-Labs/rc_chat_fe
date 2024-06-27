<template>
  <!--<div>
    <div  ref="chatroomEl" :class="[open ? 'mb-0 mr-0' : 'mb-[-50%] mr-[-50%] opacity-0 ']" class="w-full max-w-sm fixed bottom-[6rem] aspect-[9/16] shadow-xl border rounded-xl bg-white right-4 origin-bottom-right duration-300 z-50 overflow-hidden">


        <div class="w-full grid grid-cols-1 grid-rows-[auto_1fr_auto] h-full justify-center items-center">

            <div class="w-full p-2">
                <div class="w-full bg-gray-100 rounded-xl p-2 flex justify-normal items-center space-x-2">
                    <div class="h-12 w-12 rounded-xl bg-white border">

                    </div>

                    <p class="text-lg"> <span class="p-1 bg-blue-500 px-2 rounded-xl text-white font-brand font-semibold">Yao</span> from Ruilabs</p>
                </div>
            </div>

            <div class="w-full h-full space-y-4">
                
                <div v-for="message in messages" class="w-full flex px-2" :class="[getDirection(message.sender)]">
                    <div :class="[getDirection(message.sender)]">
                        <p>{{ message.sender }}</p>
                        <div class="p-2 px-3 border rounded-xl">
                            {{ message.content }}
                        </div>
                    </div>
                </div>

            </div>
    
            <form @submit.prevent="sendMessage()" class="w-full border-t h-full border-t-gray-200 grid grid-cols-[1fr_auto] p-2">
                
                <div class="pr-2">
                    <input v-model="messageInput" ref="sendMessageinput" type="text" class="w-full h-full p-1 px-2 rounded-xl" placeholder="Type a message...">
                </div>
                <button type="submit" class="w-12 h-12 flex justify-center items-center bg-green-500 shadow-md text-white rounded-xl hover:shadow-sm duration-300 hover:ring-2 hover:ring-green-500 hover:scale-90 active:scale-75 hover:ring-offset-2">
                    <iconify-icon class="text-2xl" icon="fluent:send-28-filled"></iconify-icon>
                </button>

            </form>

        </div>    





    </div>

    <div ref="chatbubbleEl" @click="toggleChat()" :class="[open ? '-scale-x-100 bg-red-500 w-[4rem] h-[4rem]  ' : 'hover:scale-95 hover:ring-4 hover:ring-green-500 hover:ring-offset-4 active:scale-75 bg-green-500 w-[5rem] h-[5rem]  ']" class="rounded-full fixed bottom-4 right-4 flex justify-center items-center duration-300">
      <iconify-icon v-if="!open" class="text-5xl text-white" icon="solar:chat-round-dots-bold-duotone"></iconify-icon>

      <iconify-icon v-if="open" class="text-5xl text-white" icon="material-symbols:close"></iconify-icon>
    </div>
  </div>-->

  <div  ref="chatroomEl" class="w-full h-full overflow-hidden">

    <div id="snapshotParent" v-if="showReceipt" class="w-screen h-screen top-0 left-0 z-50 fixed flex justify-center items-center">
        <div id="whiteFlash" class="bg-white w-full h-full absolute z-30"></div>
        <img id="receiptImage" class="w-full h-full z-20 border-8 border-blue-500 rounded-xl object-cover" :src="receiptImageData" alt="">
        <div id="blackDrop" class="bg-black/20 w-full h-full absolute z-10"></div>
    </div>


<div class="w-full grid grid-cols-1 grid-rows-[auto_1fr_auto] h-full justify-center items-center">

    <div class="w-full p-2">
        <div class="w-full bg-gray-100 rounded-xl p-2 flex justify-normal items-center space-x-2">
            <div class="h-12 w-12 rounded-xl bg-white border">

            </div>

            <p class="text-lg"> <span class="p-1 bg-blue-500 px-2 rounded-xl text-white font-brand font-semibold">Yao</span> from Ruilabs</p>
        </div>
    </div>

    <div class="w-full h-full space-y-4 flex flex-col justify-end pb-4">
        
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

    <form @submit.prevent="sendMessage()" class="w-full border-t h-full border-t-gray-200 grid grid-cols-[1fr_auto] p-2">
        
        <div class="pr-2">
            <input v-model="messageInput" ref="sendMessageinput" type="text" class="w-full h-full p-1 px-2 rounded-xl" placeholder="Type a message...">
        </div>
        <button id="sendButton" ref="sendButtonEl" type="submit" class="w-12 h-12 flex justify-center items-center bg-green-500 shadow-md text-white rounded-xl hover:shadow-sm duration-300 hover:ring-2 hover:ring-green-500 hover:scale-90 active:scale-75 hover:ring-offset-2">
            <iconify-icon class="text-2xl" icon="fluent:send-28-filled"></iconify-icon>
        </button>

    </form>

</div>    





</div>
</template>

<script setup>
import { useMouseInElement } from "@vueuse/core";

import { onMounted, ref, watch, toRefs, markRaw } from "vue";
const chatbubbleEl = ref(null);
const chatroomEl = ref(null);
const sendButtonEl = ref(null)
const sendMessageinput = ref(null)
const messageInput = ref('')

import { useElementBounding } from '@vueuse/core'

const { isOutside:isOutsideChatToggle } = useMouseInElement(chatbubbleEl);
const { isOutside:isOutsideChatroom } = useMouseInElement(chatroomEl);

import { $receiptImageData, $showReceipt, $xmtpClient } from "@/stores/stamp"

const receiptImageData = ref(null)
const showReceipt = ref(false)

import anime from 'animejs/lib/anime.es.js';
import { $userData } from "@/stores/stamp";
const sendButtonElBounding = useElementBounding(sendButtonEl)

const conversations = ref([])

const props = defineProps([ "project_info" ]);
const { project_info } = toRefs(props);

onMounted(() => {
    $showReceipt.subscribe( value => {
        console.log(value)
        showReceipt.value = value
    })

    $receiptImageData.subscribe( value => {
        receiptImageData.value = value
    })

    $xmtpClient.subscribe( async (value) => {
        if ($xmtpClient.value) {
            conversations.value = await $xmtpClient.value.conversations.list();
            // console.log(conversations.value)

            // check if the recipient address is in the list of conversations
            let exists = conversations.value.find((c) => c.peerAddress.toLowerCase() === project_info.value.owner_address.toLowerCase());

            console.log('exists', exists);

            try {
                await $xmtpClient.value.conversations.newConversation(project_info.value.owner_address.toLowerCase());
            } catch(error) {
                console.log('bypass bypass', error)
            }
            
            if (!exists) {
                await fetchMessages();
            }

            await fetchMessages();
        }
    })

})

watch(showReceipt, async () => {
    if(showReceipt.value){

        //wait until whiteFlash is visible

        let waitEl = () => {
            return new Promise((resolve, reject) => {
                let el = document.getElementById('whiteFlash')
                if(el){
                    resolve(el)
                }else{
                    setTimeout(() => {
                        resolve(waitEl())
                    }, 100)
                }
            })
        }

        await waitEl()


        console.log('showing receipt')

        anime({
            targets: '#whiteFlash',
            opacity: 0,
            duration: 300,
            easing: 'easeInOutSine'
        })

        var tl = anime.timeline({
            easing: 'easeInOutSine',
            duration: 300,
            delay: 300
        });

        tl.add({
            targets: '#receiptImage',
            scale: 0.8,
            rotate: '-6deg',
            duration: 300,
        })

        // console.log(sendButtonElBounding.right.x, sendButtonElBounding.right.y)

        

        tl.add({
            targets: '#receiptImage',
            rotate: '0deg',
            // scale: 0.1,
            width: '100px',
            height: '100px',
            // translateX: sendButtonElBounding.right.value - 50,
            complete: function(){
                let _el = document.getElementById('receiptImage')
                _el.style.transformOrigin = 'bottom right'
            },
            duration: 500
        })

        tl.add({
            targets: '#receiptImage',
            translateY: '75vh',
            translateX: '60vw',
            // translateX: sendButtonBounding.x - _elBounding.x,
            // scale: 0.1,
            duration: 300,
            easing: 'easeInOutSine'
        },"-=500")

        tl.add({
            targets: '#receiptImage',
            opacity: 0,
            duration: 600,
            easing: 'easeInOutSine'
        },'-=500')

        tl.add({
            targets: '#blackDrop',
            opacity: 0,
            duration: 600,
            easing: 'easeInOutSine'
        },'-=1000')
        
        tl.complete = () => {
            // showReceipt.value = false
            // console.log('doneee')
            $showReceipt.set(false)
            $receiptImageData.set(null)
        }
        

        // anime({
        //     targets: '#receiptImage',
        //     scale: 0.8,
        //     rotate: '-6deg',
        //     duration: 300,
        //     easing: 'easeInOutSine'
        // })

        // anime({
        //     targets: '#receiptImage',
        //     rotate: '0deg',
        //     scale: 0.8,
        //     duration: 300,
        //     easing: 'easeInOutSine',
        //     delay: 1000,
        //     width: '100px',
        //     height: '100px'
        // })


    }
} )

const open = ref(false);

const toggleChat = () => {
  open.value = !open.value;
    if(open.value){
        sendMessageinput.value.focus()
    }
};
const emit = defineEmits(["update"]);

watch(isOutsideChatToggle, () => {
  emit("update", isOutsideChatToggle.value && isOutsideChatroom.value);
});

watch(isOutsideChatroom, () => {
  emit("update", isOutsideChatToggle.value && isOutsideChatroom.value);
});

// const messages = [
//     {
//         type:'text',
//         content:'Hello, how can I help you today?',
//         sender:'Yao',
//     },
//     {
//         type:'text',
//         content:'I need help with my account',
//         sender:'me',
//     },
//     {
//         type:'text',
//         content:'Sure, what seems to be the problem?',
//         sender:'Yao',
//     },
//     {
//         type:'media',
//         // content:'I can\'t seem to login',
//         sender:'me',
//     },
// ]
const messages = ref([])

const authorDirection = (sender) => {
    return sender === 'me' ? 'text-right' : 'text-left'
}

const getDirection = (sender) => {
    return sender === 'me' ? 'flex-row-reverse' : 'flex-row'
}

const isMessageBusy = ref(false);
const sendMessage = async () => {

    if(isMessageBusy.value) return;
    isMessageBusy.value = true;

    let _message = messageInput.value;
    messageInput.value = ''

    console.log("xmtpClient.value", $xmtpClient.value, project_info.value.owner_address.toLowerCase());

    try {
        const conversation = await $xmtpClient.value.conversations.newConversation(project_info.value.owner_address.toLowerCase());
        let result = await conversation.send(_message);
        console.log("sendMessage", result);
    } catch (err) {
        console.log("sendMessage", err);
    }

    isMessageBusy.value = false;
    
}


const fetchMessages = async () => {

    messages.value = [];

    let selectedConversation = conversations.value.find((c) => c.peerAddress.toLowerCase() === project_info.value.owner_address.toLowerCase());
    console.log('selectedConversation', selectedConversation)

    if (selectedConversation) {
        let _message = await selectedConversation.messages();
        console.log('_message', _message);

        messages.value = _message.map((m) => {
            return {
                content: m.content,
                id: m.id,
                senderAddress: m.senderAddress,
                type: 'text',
                sender: m.senderAddress.toLowerCase() == $userData.value.xmtp_address.toLowerCase() ? 'me' : project_info.value.token_name,
            };
        });

        // scrollToBottom();

        for await (const message of await selectedConversation.streamMessages()) {

            const exists = messages.value.find((m) => m.id === message.id);

            if (!exists) {
                messages.value.push({
                    content: message.content,
                    id: message.id,
                    senderAddress: message.senderAddress,
                    type: 'text',
                    sender: message.senderAddress.toLowerCase() == $userData.value.xmtp_address.toLowerCase() ? 'me' : project_info.value.token_name,
                });
            }

            // scrollToBottom();
        }

    }
};

</script>
