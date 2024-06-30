<template>
  <div class="flex justify-center items-center w-full h-full max-h-[70vh] lg:h-[60vh]">

    <div v-if="gotStamp" class="w-screen h-screen fixed top-0 left-0 z-10 pointer-events-none" :style="`background:${currentColor}20;`">
      <div class="w-full grid" style="grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr))">
        <div class="pointer-events-none changing-text w-full aspect-square flex justify-center items-center text-8xl filter font-brand font-black opacity-20" :style="`color:${currentColor};`" v-for="i in 200">{{ currentCharacter }}</div>
      </div>
    </div>

    <ModalVue :project_info="project_info" :campaign_info="$selectedCampaign.value" @stamped="showStampedAnimation()"></ModalVue>
    <NewStampModal :project_info="project_info" @update="afterWelcome()"></NewStampModal>
    <ConnectWallet></ConnectWallet>

    <div id="snapshotParent" v-if="showReceipt" class="w-screen h-screen top-0 left-0 z-[999] fixed flex justify-center items-center">
      <div id="whiteFlash" class="bg-white w-full h-full absolute z-30"></div>
      <img id="receiptImage" class="w-full h-full z-20 rounded-xl object-cover" :src="receiptImageData" alt="" />
      <div id="blackDrop" class="bg-black/50 w-full h-full absolute z-10"></div>
    </div>

    <div v-if="showWelcome" id="showWelcomeEl" class="w-screen h-screen fixed top-0 left-0 z-[101] bg-[#EBE6DF] flex justify-center items-center flex-col opacity-0 scale-90">
      <h1 class="text-4xl font-brand font-bold mb-8 text-black">Welcome to</h1>

      <p class="text-black text-8xl font-brand font-semibold">{{ project_info?.token_name }}</p>

      <p class="text-black text-xl uppercase font-brand mt-8">
        on&nbsp;&nbsp;&nbsp;
        <span class="bg-blue-500 text-white px-4 py-2 rounded-full">REMO</span>
      </p>
    </div>

    <template v-if="gotStamp">
      <div class="w-full flex justify-center items-center p-4 sm:p-0 h-full">
        <div class="w-full absolute hidden lg:grid grid-cols-[1fr_28rem_1fr] justify-center items-center">
          <div class="flex flex-col justify-center items-center p-8">
            <section ref="campaignList2" class="campaignList bg-white z-50 rounded-xl shadow-xl max-h-[300px] overflow-hidden w-full max-w-xs bg-opacity-20 hover:bg-opacity-100 duration-300 backdrop-blur-md">
              <p class="text-left text-xl font-brand font-bold p-4 border-b bg-white sticky top-0">Active Campaigns</p>

              <div class="px-4">
                <div class="py-2 flex justify-between items-center" v-for="campaign in project_info?.campaigns">
                  <p class="font-brand text-lg">{{ campaign?.tag }}</p>
                  <button @click="showCampaignModalTrigger(campaign)" :style="`background:${currentColor};`" class="text-sm rounded-md px-4 py-1 hover:scale-105 active:scale-90 duration-300">Join</button>
                </div>
              </div>
            </section>
          </div>
          <div></div>
          <div class="w-full flex justify-center items-center flex-col">
            <!-- <button class="w-[250px] h-[250px] bg-white rounded-full z-50">

          </button> -->

            <StampCircle class="z-50" :address="getAccount(config)?.address" :name="$userData.value?.name"></StampCircle>
            <button @click="disconnectWallet()" class="z-50 mt-8 px-4 py-2 rounded-full bg-red-100 text-lg font-brand border border-white hover:ring-2 hover:ring-red-500 hover:ring-offset-2 hover:bg-red-500 hover:text-white duration-300 text-red-500 active:scale-75">Disconnect</button>
          </div>
        </div>

        <div class="w-full max-w-md h-full z-20">
          <div class="lg:hidden -mt-12 pb-2">

            
            
            <div class="fixed top-2 right-0 z-50 p-2 flex justify-between items-center w-full">
              <div class="flex justify-start items-center space-x-4">
                

                <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="bg-white w-12 h-12 border rounded-xl shadow flex justify-center items-center">
        <iconify-icon class="text-xl" icon="hugeicons:stamp-02"></iconify-icon>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-4 rounded-xl" :align="'start'">
      <StampCircle :address="getAccount(config)?.address" :name="$userData.value?.name"></StampCircle>
    </DropdownMenuContent>
  </DropdownMenu>

                <p class="font-brand text-lg">{{ getAccount(config)?.address?.slice(0, 6) }}...{{ getAccount(config)?.address?.slice(-4) }}</p>
              </div>

              <Button @click="disconnectWallet()" class="bg-red-100 text-red-500" variant="ghost">Disconnect</Button>
            </div>
            
            <Drawer>
              <DrawerTrigger>
                <button class="bg-black text-white font-brand font-semibold p-3 px-4 rounded-xl duration-300 hover:ring-2 hover:ring-black hover:ring-offset-2 active:scale-90">View All Campaign ({{ project_info?.campaigns?.length }})</button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Active Campaign</DrawerTitle>
                  <DrawerDescription>active campaign.</DrawerDescription>
                </DrawerHeader>

                <section class="bg-white z-50 rounded-xl shadow-xl max-h-[80vh] overflow-y-auto w-full">
                  <!-- <p class="text-left text-xl font-brand font-bold p-4 border-b bg-white sticky top-0">Active Campaigns</p> -->

                  <div class="px-4">
                    <div class="py-2 flex justify-between items-center" v-for="campaign in project_info?.campaigns">
                      <p class="font-brand text-lg">{{ campaign?.tag }}</p>

                      <DrawerTrigger>
                        <button @click="showCampaignModalTrigger(campaign)" :style="`background:${currentColor};`" class="text-sm rounded-md px-4 py-1 hover:scale-105 active:scale-90 duration-300">Join</button>

                      </DrawerTrigger>
                      
                      
                      
                    </div>
                  </div>
                </section>

              </DrawerContent>
            </Drawer>
          </div>

          <div id="chatWindow"  class="chat-parent shadow-xl w-full h-full rounded-xl p-4 pb-0 overflow-hidden max-h-[500px]">
            <div class="w-full bg-white text-black  border-2 border-black/10 rounded-md p-4 font-brand font-bold sticky top-0 z-20">From {{ project_info?.token_name }}</div>

            <div class="chat">


              <div v-for="(message, index) in messages" >
                <div :class="[ messages.length <= index && message?.sender !== messages[index+1]?.sender ? 'messages' : 'flex flex-col' , message?.sender === 'me' ? 'mine' : 'yours']" >
                  <template v-if="message?.type == 'text'">
                    <div :class="[message?.sender === messages[index+1]?.sender ? 'message' : 'message last']" >
                      {{ message?.content }}
                    </div>
                  </template>

                  <template v-else-if="message?.type == 'attachment'">
                      <div class="w-[100px] h-[100px] border rounded-md">
                          <img :src="message?.content" />
                      </div>
                  </template>

                  <template v-else>
                      <div class="w-[100px] h-[100px] border rounded-md">
                        Unable to load content.
                      </div>
                  </template>

                </div>
              </div>

              <div ref="spacer" class="w-full h-4"></div>

              <!-- <div class="mine messages">
                <div class="message last">Dude</div>
              </div>
              <div class="yours messages">
                <div class="message">Hey!</div>
                <div class="message">You there?</div>
                <div class="message last">Hello, how's it going?</div>
              </div>
              <div class="mine messages">
                <div class="message">Great thanks!</div>
                <div class="message last">How about you?</div>
              </div> -->

            </div>
          </div>




          



  
          <form id="formEl" @submit.prevent="pushXmtpMessage()" class="w-full grid grid-cols-[1fr_3rem] items-center justify-center gap-2 pt-4">
            <div>
              <Input v-model="messageInput" class="h-12 rounded-full text-lg pl-4 placeholder:italic font-brand" placeholder="Say Hi!" />
            </div>

            <div>
              <button type="submit" class="w-12 h-12 flex justify-center items-center bg-green-500 shadow-md text-white rounded-full hover:shadow-sm duration-300 hover:ring-2 hover:ring-green-500 hover:scale-90 active:scale-75 hover:ring-offset-2">
                <iconify-icon class="text-2xl" icon="fluent:send-28-filled"></iconify-icon>
              </button>
            </div>
          </form>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="z-50 w-full flex flex-col justify-center items-center bg-[#EBE6DF] h-screen">

        <img class="fixed rounded-xl overflow-hidden top-4 right-4 w-20 h-20 border-4 border-black/60" src="/logo.png">

        <h1 class="sm:text-6xl text-4xl font-brand font-bold mb-4">Welcome!</h1>

        <h1 class="sm:text-2xl text-xl font-brand font-bold mb-4 text-center">
          To participate in events by
          <div class="bg-black text-white rounded-full mx-2 px-3 p-2 sm:my-0">{{ project_info?.token_name }} on REMO</div>
          please get a stamp.
        </h1>

        <div class="w-full flex justify-center items-center py-8 px-8">
          <section ref="campaignList1" class="campaignList border-2 z-50 rounded-xl shadow-xl max-h-[300px] overflow-hidden w-full max-w-md bg-white/50">
            <p class="text-left text-xl font-brand font-bold p-4 border-b bg-white sticky top-0">Active Campaigns</p>

            <div class="px-4">
              <div class="py-2 flex justify-between items-center" v-for="campaign in project_info?.campaigns">
                <p class="font-brand text-lg">{{ campaign?.tag }}</p>
                <button @click="showCampaignModalTrigger(campaign)" :style="`background:${currentColor};`" class="text-sm rounded-md px-4 py-1 hover:scale-105 active:scale-90 duration-300">Join</button>
              </div>
            </div>
          </section>
        </div>

        <div class="w-full grid grid-cols-2 gap-4 justify-center items-center max-w-sm">
          <div>
            <p class="text-sm text-center py-2">New User?</p>
            <button @click="showStampModal()" class="bg-blue-500 w-full rounded-xl text-white py-4 font-brand font-semibold text-lg hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 active:scale-75 duration-300">Get a Stamp (free)</button>
          </div>

          <div>
            <p class="text-sm text-center py-2">Already got stamp?</p>
            <button @click="showConnectWalletModal()" class="bg-blue-50 w-full rounded-xl text-blue-500 py-4 font-brand font-semibold text-lg hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 active:scale-75 duration-300">Connect Wallet</button>
          </div>
        </div>
      </div>
    </template>


  
  
</div>
</template>

<script setup>
import { onMounted, ref, watch, toRefs } from "vue";
import ModalVue from "@/components/chat_1/Modal.vue"
import NewStampModal from "@/components/chat_1/NewStamp.vue"
import ConnectWallet from "@/components/chat_1/ConnectWallet.vue"
import StampCircle from "@/components/StampCircle.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'



import { Button } from "@/components/ui/button";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbars } from "overlayscrollbars";

import { Input } from "@/components/ui/input";
import anime from "animejs/lib/anime.es.js";

const props = defineProps([ "project_info" ]);
const { project_info } = toRefs(props);

import { connect, reconnect, getAccount, disconnect, getConnectors, watchConnections } from '@wagmi/core';
import { config } from '@/wagmiConfig';

import { $showNewStampModal, $showWalletModal, initUser, initXmtp, $userData, $receiptImageData, $showReceipt, $xmtpClient, $refreshMessages, $showCampaignModal, $selectedCampaign } from "@/stores/stamp_1";


import { useSound } from '@vueuse/sound'
// import buttonSfx from '../assets/sounds/button.mp3'

const conversations = ref([]);
const messages = ref([]);

const characters = ["R", "E", "M", "O"];
let characterIndex = 0;

const colors = ["#F5E804", "#EE7CF5", "#9EA3EB", "#038B56"];

const currentCharacter = ref(characters[characterIndex]);
const currentColor = ref(colors[0]);

const receiptImageData = ref(null);
const showReceipt = ref(false);

const gotStamp = ref(false);
const showWelcome = ref(false);
const spacer = ref(null);



const campaignList1 = ref(null)
const campaignList2 = ref(null)

const sendMessage = () => {
  console.log("Sending message...");

  let tl = anime.timeline({
    easing: "easeOutExpo",
    // easing: 'spring(1, 80, 10, 0)',
    duration: 300,
  });

  tl.add({
    targets: "#formEl",
    // rotate: 10,
    translateY: -25,
    scale: 0.9,
  });

  tl.add({
    targets: "#formEl",
    rotate: 0,
    translateY: 0,
    scale: 1,
  });

  characterIndex = characterIndex === characters.length - 1 ? 0 : characterIndex + 1;

  currentCharacter.value = characters[characterIndex];

  let textTl = anime.timeline({
    easing: "easeOutExpo",
    duration: 300,
  });

  textTl.add({
    targets: ".changing-text",
    rotate: 360,
    scale: 0,
  });

  textTl.add({
    targets: ".changing-text",
    rotate: 0,
    scale: 1,
  });

  // Randomly pick a color
  let _excludeCurrentColor = colors.filter((color) => color !== currentColor.value);
  currentColor.value = _excludeCurrentColor[Math.floor(Math.random() * _excludeCurrentColor.length)];
};



const showCampaignModalTrigger = (_c) => {
  console.log("showing modal from drawer");
  console.log(_c);

  $showCampaignModal.set(false);
  $showCampaignModal.set(true);

  $selectedCampaign.set(null);
  $selectedCampaign.set(_c);
}

const enableOverlayScrollbars = () => {
  if (document?.querySelector(".campaignList") != null) {
    let _body = document.querySelector(".campaignList");

    console.log("enabling overlay scrollbars");
    const osInstance = OverlayScrollbars(_body, {
      scrollbars: {
        autoHide: "leave",
        autoHideDelay: 500,
      },
    });
  }

  if (document?.querySelector("#chatWindow") != null) {
    let _body = document.querySelector("#chatWindow");

    console.log("enabling overlay scrollbars");
    const osInstance = OverlayScrollbars(_body, {
      scrollbars: {
        autoHide: "leave",
        autoHideDelay: 500,
      },
    });
  }

};

const scrollToBottom = (args) => {
  if (spacer?.value) {
    spacer.value.scrollIntoView();
  }
};


onMounted( async () => {

  $showReceipt.subscribe((value) => {
    console.log(value);
    // showReceipt.value = value;
  });

  $receiptImageData.subscribe((value) => {
    receiptImageData.value = value;
  });

  watch(showReceipt, async () => {
    // receiptAnimation();
  });
  
  watch(campaignList1, () => {
    enableOverlayScrollbars();
  });

  watch(campaignList2, () => {
    enableOverlayScrollbars();
  });

  watch(messages, () => {
    scrollToBottom();
  });

  enableOverlayScrollbars();

  watchConnections(config, {
      onChange(data) {
          let _account = getAccount(config)
          console.log('watchConnections', _account)
          checkWalletAccount();
      }
  })

  await reconnect(config)
  checkWalletAccount();

  $xmtpClient.subscribe( async (value) => {
      if ($xmtpClient.value) {
          conversations.value = await $xmtpClient.value.conversations.list();
          console.log('conversations.value', conversations.value)

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

  $refreshMessages.subscribe( async () => {
      console.log("$refreshMessages.value", $refreshMessages.value)

      if(messages.value.length == 0) {
        console.log('gggggggg')
        conversations.value = await $xmtpClient.value?.conversations.list();
        fetchMessages();
      } else {
        fetchMessages();
      } 

  })


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlCampaign = urlParams.get('campaign')
  console.log('urlCampaign', urlCampaign);

  const _campaign = project_info.value?.campaigns.find(x => Number(x.id) === Number(urlCampaign))
  if(_campaign) showCampaignModalTrigger(_campaign);

  await fetch(`/api/logs.json`, {
    method: "POST",
    headers: {
      'content-type': "application/json"
    },
    body: JSON.stringify({
      payload: {
        token_symbol: project_info.value.token_symbol,
        token_address: project_info.value.token_address.toLowerCase(),
        campaign: parseInt(urlCampaign)
      },
      name: "visit",
      user_data: {address: getAccount(config)?.address.toLowerCase()},
    }),
  })


  scrollToBottom();

  
});

const getUrlParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlCampaign = urlParams.get('campaign')
  return urlCampaign
}

async function log() {
 await fetch(`/api/logs.json`, {
   method: "POST",
   headers: {
     'content-type': "application/json"
   },
   body: JSON.stringify({
     payload: {
       token_symbol: project_info.value.token_symbol,
       token_address: project_info.value.token_address.toLowerCase(),
       campaign: parseInt(getUrlParams())
     },
     name: "connect",
     user_data: {address: getAccount(config)?.address.toLowerCase()},
   }),
 })
}

const checkWalletAccount = async () => {

  if(getAccount(config)?.address) {

    log()

    await initUser();

    if($userData.value) {
      // wallet found in supabase
      initXmtp();
      // updateGotStamp();
      gotStamp.value = true;
      $showNewStampModal.set(false);

    } else {
      // wallet not found in supabase
      
      // showStampModal();

    }



  } else {
    gotStamp.value = false;
  }

}

const updateGotStamp = async () => {
  showWelcome.value = true;

  // wait for showWelcomeEl

  let waitEl = () => {
    return new Promise((resolve, reject) => {
      let el = document.getElementById("showWelcomeEl");
      if (el) {
        resolve(el);
      } else {
        setTimeout(() => {
          resolve(waitEl());
        }, 100);
      }
    });
  };

  await waitEl();

  let tl = anime.timeline({
    easing: "easeOutExpo",
    // easing: 'spring(1, 80, 10, 0)',
    duration: 300,
  });

  tl.add({
    targets: "#showWelcomeEl",
    // marginLeft: 0,
    opacity: 1,
    scale: 1,
    duration: 500,
    easing: "easeInOutQuad",
    complete: () => {
      gotStamp.value = true;
    },
  });

  tl.add({
    targets: "#showWelcomeEl",
    // marginLeft: '100vw',
    opacity: 0,
    scale: 1.5,
    duration: 500,
    delay: 600,
    easing: "easeInOutQuad",
    complete: () => {
      showWelcome.value = false;
    },
  });
};


const disconnectWallet = async () => {
  let wallet = getAccount(config)
  localStorage.removeItem(`xmtp-wallet-${wallet.address.toLowerCase()}`);
  $userData.set(null);
  await disconnect(config);
}

const showStampModal = () => {
  $showNewStampModal.set(true);
};

const showConnectWalletModal = () => {
  $showWalletModal.set(true);
};

import { ContentTypeRemoteAttachment, RemoteAttachmentCodec, AttachmentCodec } from "@xmtp/content-type-remote-attachment";

const fetchMessages = async () => {

  // messages.value = [];
  let selectedConversation = conversations.value?.find((c) => c.peerAddress.toLowerCase() === project_info.value.owner_address.toLowerCase());
  console.log('selectedConversation', selectedConversation)

  if (selectedConversation) {
      let _message = await selectedConversation.messages();
      console.log('_message', _message);

      
      messages.value = await Promise.all(

          _message.map( async (m) => {
              
              // return {
              //         content: m.content,
              //         id: m.id,
              //         senderAddress: m.senderAddress,
              //         type: 'text',
              //         sender: m.senderAddress.toLowerCase() == $userData.value.xmtp_address.toLowerCase() ? 'me' : project_info.value.token_name,
              //     };

              if (m.contentType.sameAs(ContentTypeRemoteAttachment)) {

                  try {
                      
                      const attachment = await RemoteAttachmentCodec.load(m.content, $xmtpClient.value);
      
                      // console.log("attachment", m, attachment)

                      const objectURL = URL.createObjectURL(
                          new Blob([Buffer.from(attachment.data)], {
                              type: attachment.mimeType,
                          }),
                      );
                      // console.log('objectURL', objectURL)

                      return {
                          content: objectURL,
                          id: m.id,
                          senderAddress: m.senderAddress,
                          type: 'attachment',
                          sender: m.senderAddress.toLowerCase() == $userData.value.xmtp_address.toLowerCase() ? 'me' : project_info.value.token_name,
                      };

                  } catch(error) {

                      // console.log("error attachment", m, error)
                      return {
                          content: '',
                          id: m.id,
                          senderAddress: m.senderAddress,
                          type: 'media',
                          sender: m.senderAddress.toLowerCase() == $userData.value.xmtp_address.toLowerCase() ? 'me' : project_info.value.token_name,
                      };
                  }

              } else {
                  return {
                      content: m.content,
                      id: m.id,
                      senderAddress: m.senderAddress,
                      type: 'text',
                      sender: m.senderAddress.toLowerCase() == $userData.value.xmtp_address.toLowerCase() ? 'me' : project_info.value.token_name,
                  };
              }

          })
      )

      scrollToBottom();

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
              
              playIncoming()
              
          }

          scrollToBottom({
              behavior: "smooth",
          });


      }

  }

  
};
const isMessageBusy = ref(false);
const messageInput = ref('')
const pushXmtpMessage = async () => {

    if(isMessageBusy.value) return;
    isMessageBusy.value = true;

    let _message = messageInput.value;
    messageInput.value = ''

    // console.log("xmtpClient.value", $xmtpClient.value, project_info.value.owner_address.toLowerCase());

    try {
        const conversation = await $xmtpClient.value.conversations.newConversation(project_info.value.owner_address.toLowerCase());
        sendMessage();
        await conversation.send(_message);
    } catch (err) {
        console.log("sendMessage", err);
    }
    
    if(messages.value.length == 0) {
      conversations.value = await $xmtpClient.value.conversations.list();
      fetchMessages();
    } 
    isMessageBusy.value = false;

    scrollToBottom({
              behavior: "smooth",
          });
    
}

const afterWelcome = () => {

  
  
  checkWalletAccount();
  updateGotStamp();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlCampaign = urlParams.get('campaign')
  console.log('urlCampaign', urlCampaign);
  
  const _campaign = project_info.value?.campaigns.find(x => Number(x.id) === Number(urlCampaign))
  if(_campaign) showCampaignModalTrigger(_campaign);

  setTimeout(() => {
    fetchMessages();
  }, 5000)
  
}

const showStampedAnimation = () => {
  showReceipt.value = true;
  receiptAnimation();
}

const receiptAnimation = async () => {
  if (showReceipt.value) {
      console.log("showing receipt");

      //wait until whiteFlash is visible

      let waitEl = () => {
        return new Promise((resolve, reject) => {
          let el = document.getElementById("whiteFlash");
          if (el) {
            resolve(el);
          } else {
            setTimeout(() => {
              resolve(waitEl());
            }, 100);
          }
        });
      };

      await waitEl();

      console.log("showing receipt");

      anime({
        targets: "#whiteFlash",
        opacity: 0,
        duration: 300,
        easing: "easeInOutSine",
      });

      var tl = anime.timeline({
        easing: "easeInOutSine",
        duration: 300,
        delay: 300,
      });

      tl.add(
        {
          targets: "#receiptImage",
          scale: 0.8,
          rotate: "-6deg",
          duration: 300,
        },
        "-=150"
      );

      // console.log(sendButtonElBounding.right.x, sendButtonElBounding.right.y)

      tl.add({
        targets: "#receiptImage",
        rotate: "0deg",
        // scale: 0.1,
        width: "200px",
        height: "200px",
        // translateY: 100,

        // translateX: sendButtonElBounding.right.value - 50,
        // complete: function(){
        //     let _el = document.getElementById('receiptImage')
        //     _el.style.transformOrigin = 'bottom right'
        // },
        duration: 300,
      });

      /*        tl.add({
            targets: '#receiptImage',
            // translateX: '60vw',
            // translateX: sendButtonBounding.x - _elBounding.x,
            // scale: 0.1,
            duration: 300,
            easing: 'easeInOutSine'
        },"-=500")*/

      tl.add(
        {
          targets: "#receiptImage",
          translateY: -50,
          duration: 300,
          easing: "easeInOutSine",
        },
        "-=300"
      );

      tl.add({
        targets: "#receiptImage",
        opacity: 0,
        translateY: 100,
        duration: 200,
        easing: "easeInOutSine",
      });

      tl.add(
        {
          targets: "#blackDrop",
          opacity: 0,
          duration: 300,
          easing: "easeInOutSine",
        },
        "-=300"
      );

      tl.complete = () => {
        showReceipt.value = false
        // console.log('doneee')
        $showReceipt.set(false);
        $receiptImageData.set(null);
      };
    }
}

const { play:playIncoming } = useSound('/ringtone.mp3',{
  volume: 0.25
})

</script>

<style scoped lang="scss">
$background-color: #ffffff;
$mine-background: #5750e9;
$mine-color: #eae9ff;
$yours-background: #f7e1f2;
$yours-color: #ff22cb;

.chat-parent {
  background: $background-color;
  
}

.chat {
  /* width: 300px; */
  /* border: solid 1px #EEE; */
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.messages {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.message {
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
  font-size: large;
  font-family: "Sora", serif;
  font-weight: 600;
}

.yours {
  align-items: flex-start;
}

.yours .message {
  margin-right: 25%;
  background-color: $yours-background;
  color: $yours-color;
  position: relative;
}

.yours .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background-color: $yours-background;
  $yours-color: #2e6546;
  border-bottom-right-radius: 15px;
}
.yours .message.last:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: $background-color;
  border-bottom-right-radius: 10px;
}

.mine {
  align-items: flex-end;
}

.mine .message {
  color: $mine-color;
  margin-left: 25%;
  //   background: linear-gradient(to bottom, $mine-background 0%, #0085d1 100%);
  background: $mine-background;
  background-attachment: fixed;
  position: relative;
}

.mine .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  //   background: linear-gradient(to bottom, $mine-background 0%, #0085d1 100%);
  background: $mine-background;
  background-attachment: fixed;
  border-bottom-left-radius: 15px;
}

.mine .message.last:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: $background-color;
  border-bottom-left-radius: 10px;
}
</style>
