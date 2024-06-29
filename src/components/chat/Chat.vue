<template>
  <div class="w-full h-full">
    <template v-if="address">
      <Teleport to="#userlist">
        <div class="w-full divide-y divide-stone-700 pb-[20vh]">
          <div @click="pickConversation(conversation)" v-for="conversation in conversations" class="w-full justify-center items-center duration-300 p-4 bg-white/5 hover:bg-white/10">
            <p class="font-brand text-lg text-stone-200">{{ conversation?.userData?.contact_books?.name }}</p>
            <p class="text-sm pt-1 text-stone-500">{{ conversation?.peerAddress }}</p>

            <!-- <div class="flex justify-start items-center space-x-2 col-span-full pb-2 pl-1">
              <div v-for="i in 3" class="text-xs border px-2 py-1 rounded-full bg-white">Tag {{ i }}</div>

              <button class="bg-white text-xs border px-2 py-1 rounded-full">+ 4</button>
            </div> -->
          </div>
          <div class="w-full border-t text-center pt-2">
            <p class="text-sm italic text-gray-500">-- Even good things will come to an end. --</p>
          </div>
        </div>
      </Teleport>

      <Teleport to="#chatBox">
        <div class="w-full grid grid-cols-1 grid-rows-[auto_1fr_auto] h-full justify-center items-center">
          <div class="w-full p-4 pb-2 grid grid-cols-3 justify-center items-center sticky top-0 bg-white/5 border-b border-b-white/10">
            <p class="font-brand text-white text-xl ">{{ selectedConversation?.userData?.contact_books?.name }}</p>
            <!-- <p class="text-sm col-span-2 text-right text-stone-500">Tags</p> -->

            

            <div class="col-span-2 flex flex-col justify-center items-end row-span-2">
              <div class="flex flex-wrap gap-2 justify-start items-center">
                <div v-for="i in 3" class="text-sm border px-3 py-1 rounded-full bg-stone-700 border-stone-500 text-white">Tag {{ i }}</div>
              </div>
            </div>

            <p class="text-sm text-stone-400">{{ selectedConversation?.peerAddress }}</p>
          </div>

          <div class="w-full h-full space-y-4 flex flex-col justify-end p-4">
            <div v-for="message in selectedConversation?.messages" class="w-full flex" :class="[getDirection(message.sender)]">
              <div :class="[getDirection(message.sender)]">
                <!-- <p :class="[authorDirection(message.sender), 'w-full']">{{ message.sender }}</p> -->
                <template v-if="message.type == 'text'">
                  <div class="p-2 px-3 rounded-xl bg-stone-700 text-stone-200">
                    {{ message.content }}
                  </div>
                </template>

                <template v-else-if="message.type == 'attachment'">
                  <div class="w-[100px] h-[100px] border rounded-md">
                    <img :src="message.content" />
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

      <form @submit.prevent="sendMessage()" class="w-full border-t border-t-stone-700 bg-stone-800 grid grid-cols-[1fr_auto] justify-center items-center p-2">
        <div class="">
          <input v-model="messageInput" ref="sendMessageinput" type="text" class="w-full h-full py-4 px-4 bg-transparent focus-visible:outline-none text-white" placeholder="Type a message..." />
        </div>
        <button type="submit" class="w-12 h-12 flex justify-center items-center bg-blue-500 shadow-md text-white rounded-xl hover:shadow-sm duration-300 hover:ring-2 hover:ring-blue-300 hover:scale-90">
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
import { onMounted, ref, toRefs } from "vue";
import { Button } from "@/components/ui/button";
import { connect, reconnect, getAccount, disconnect, getConnectors, watchConnections } from "@wagmi/core";
import { config } from "@/wagmiConfig";
import { $xmtpClient, fetchProjectStamp, $projectStampList } from "@/stores/admin";

const address = ref();
const connectors = ref();

const selectConnector = async (connector) => {
  await connect(connector, config);
};

const checkAccount = async () => {
  try {
    let _address = await getAccount(config);

    if (_address) {
      address.value = _address.address;
    }
  } catch (err) {}
};
let unwatch;


const conversations = ref([]);
const messages = ref([]);
const props = defineProps([ "project_info" ]);
const { project_info } = toRefs(props);
import { ContentTypeRemoteAttachment, RemoteAttachmentCodec, AttachmentCodec } from "@xmtp/content-type-remote-attachment";
const selectedConversation = ref(null);

onMounted(async () => {
  // console.log('aaa')
  connectors.value = getConnectors(config);
  // console.log(connectors.value)

  unwatch = watchConnections(config, {
    onChange(data) {
      let _account = getAccount(config);
      console.log(_account);
      address.value = _account.address;
    },
  });
  await reconnect(config);

  await checkAccount();



  $xmtpClient.subscribe( async (value) => {
      if ($xmtpClient.value) {
          await fetchProjectStamp(project_info.value);
          const _conversation = await $xmtpClient.value.conversations.list();
          // console.log('_conversation', _conversation)
          const contactList = [...new Set($projectStampList.value.map(x => x?.contact_books?.xmtp_address))]
          console.log('contactList', contactList)
          conversations.value = _conversation.filter((x) => contactList.includes(x.peerAddress.toLowerCase()))
          
          conversations.value = await Promise.all(
            conversations.value.map( async (c) => {
              c['userData'] = $projectStampList.value.find(x => x.contact_books?.xmtp_address.toLowerCase() === c?.peerAddress.toLowerCase());
              c['messages'] = await processMessages(c)

              streamMessage(c);

              return c;
            })
          )

          // for(let c of conversations.value) {
          //   c['userData'] = $projectStampList.value.find(x => x.contact_books?.xmtp_address.toLowerCase() === c?.peerAddress.toLowerCase());
          //   c['messages'] = await processMessages(c)
          // }
          
          console.log('conversations.value', conversations.value)
          selectedConversation.value = conversations.value[0];



      }
  })
  
});

// const messages = [
//   {
//     type: "text",
//     content: "Hello, how can I help you today?",
//     sender: "Yao",
//   },
//   {
//     type: "text",
//     content: "I need help with my account",
//     sender: "me",
//   },
//   {
//     type: "text",
//     content: "Sure, what seems to be the problem?",
//     sender: "Yao",
//   },
//   {
//     type: "text",
//     content: "Hello, how can I help you today?",
//     sender: "Yao",
//   },
//   {
//     type: "text",
//     content: "I need help with my account",
//     sender: "me",
//   },
//   {
//     type: "text",
//     content: "Sure, what seems to be the problem?",
//     sender: "Yao",
//   },
//   {
//     type: "text",
//     content: "Hello, how can I help you today?",
//     sender: "Yao",
//   },
//   {
//     type: "text",
//     content: "I need help with my account",
//     sender: "me",
//   },
//   {
//     type: "text",
//     content: "Sure, what seems to be the problem?",
//     sender: "Yao",
//   },
//   {
//     type: "text",
//     content: "Hello, how can I help you today?",
//     sender: "Yao",
//   },
//   {
//     type: "text",
//     content: "I need help with my account",
//     sender: "me",
//   },
//   {
//     type: "text",
//     content: "Sure, what seems to be the problem?",
//     sender: "Yao",
//   },
//   {
//     type: "media",
//     // content:'I can\'t seem to login',
//     sender: "me",
//   },
// ];
const authorDirection = (sender) => {
  return sender === "me" ? "text-right" : "text-left";
};
const getDirection = (sender) => {
  return sender === "me" ? "flex-row-reverse" : "flex-row";
};

const isMessageBusy = ref(false);
const messageInput = ref("");
const sendMessage = async () => {


  if(isMessageBusy.value) return;
    isMessageBusy.value = true;

    let _message = messageInput.value;
    messageInput.value = ''

    try {
        const conversation = await $xmtpClient.value.conversations.newConversation(selectedConversation.value.peerAddress);
        await conversation.send(_message);
    } catch (err) {
        console.log("sendMessage", err);
    }
    
    isMessageBusy.value = false;

};



const processMessages = async (_conversation) => {

  let _message = await _conversation.messages();
  const pmessage = await Promise.all(
    _message.map( async (m) => {
      if (m.contentType.sameAs(ContentTypeRemoteAttachment)) {
        try {

          const attachment = await RemoteAttachmentCodec.load(m.content, $xmtpClient.value);
          const objectURL = URL.createObjectURL(
              new Blob([Buffer.from(attachment.data)], {
                  type: attachment.mimeType,
              }),
          );
          return {
            content: objectURL,
            id: m.id,
            senderAddress: m.senderAddress,
            type: 'attachment',
            sender: m.senderAddress.toLowerCase() === $xmtpClient.value.address.toLowerCase() ? 'me' : m.senderAddress,
          }

        } catch(error) {
          return {
            content: '',
            id: m.id,
            senderAddress: m.senderAddress,
            type: 'media',
            sender: m.senderAddress.toLowerCase() === $xmtpClient.value.address.toLowerCase() ? 'me' : m.senderAddress,
          }
        }
      } else {
        return {
          content: m.content,
          id: m.id,
          senderAddress: m.senderAddress,
          type: 'text',
          sender: m.senderAddress.toLowerCase() === $xmtpClient.value.address.toLowerCase() ? 'me' : m.senderAddress,
        }
      }
    })
  )

  return pmessage;

}

const streamMessage = async (_c) => {
  for await (const message of await _c.streamMessages()) {
    const exists = _c?.messages.find((m) => m.id === message.id);
    if(!exists) {
      console.log('streamMessage', message.content)
      _c.messages.push({
        content: message.content,
        id: message.id,
        senderAddress: message.senderAddress,
        type: 'text',
        sender: message.senderAddress.toLowerCase() === $xmtpClient.value.address.toLowerCase() ? 'me' : message.senderAddress,
      })
    }
  }
}

const pickConversation = (_c) => {
  console.log('selectedConversation.value', _c)
  selectedConversation.value = _c;
}

</script>
