import { messages, conversations, recipientAddress } from "./chat.vue";

// const selectedConversation = computed(() => {
// //   return xmtpClient.value?.conversations?.selectedConversation;
//     return conversations.value.find( c => c.peerAddress === recipientAddress.value)
// });
export const fetchMessages = async () => {
messages.value = [];

let selectedConversation = conversations.value.find(c => c.peerAddress === recipientAddress.value);

if (selectedConversation) {
let _message = await selectedConversation.messages();
console.log(_message);

messages.value = _message.map(m => {
return {
content: m.content,
id: m.id,
senderAddress: m.senderAddress
};
});



// console.log(selectedConversation)
// await streamMessages()
}
};
