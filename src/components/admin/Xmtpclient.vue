<template>
  <div class="text-white mr-2"> {{ address?.substring(0, 6) + "..." + address?.substring(address?.length - 4) }} </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { connect, reconnect, getAccount, disconnect, getConnectors, watchConnections, getClient } from "@wagmi/core";
import { config } from "@/wagmiConfig";
import { loadKeys, storeKeys } from "@/utils/keyStorage";
import { getEthersSigner } from "@/utils/getEthersSigner";
import { Client } from "@xmtp/xmtp-js";
import { $xmtpClient } from "@/stores/admin";
import { isSmartWalletConnected } from "@/utils/userAuth";
import { ContentTypeAttachment, AttachmentCodec, RemoteAttachmentCodec, ContentTypeRemoteAttachment } from "@xmtp/content-type-remote-attachment";


const address = ref();
const connectors = ref();

const getSigner = async () => {
//   console.log("getting signer");
  let signer = false;

  try {
    signer = await getEthersSigner(config);
    // console.log(signer);
    // let _s = await signer.getSigner()
    let _s = await signer.provider.getSigner();
    // console.log(_s);
    // return _s;
    signer = _s;
  } catch (err) {
    console.log(err);
    // throw err;
  }

  if (signer) {
    return signer;
  } else {
    setTimeout(async () => {
      await getSigner();
    }, 1000);
  }
};

const clientOptions = {
    env: "production",
    disablePersistenceEncryption: true,
};


const initXmtp = async () => {
    
  let keys = false;


  if(isSmartWalletConnected()) {

    


  } else {
    const signer = await getSigner();
    let _address = address.value
  
      // console.log(signer);
    try {
      keys = loadKeys(_address);
      if(keys){
          await fetch('/api/keys.json', {
            method: 'POST',
            body: JSON.stringify({
              address: _address,
              keys: Buffer.from(keys).toString("hex"),
            })
          })
      }
    } catch (err) {
      console.log(err);
    }
  
    if (!keys) {
      console.log("getting keys");
      keys = await Client.getKeys(signer, {
        ...clientOptions,
      });
  
      // console.log(keys);
      storeKeys(_address, keys);
    }
  }















  // await signMessage(config, { message: 'hello world' })

  // const client = await getWalletClient(config)

  const xmtp = await Client.create(null, {
    ...clientOptions,
    privateKeyOverride: keys,
  });

  xmtp.registerCodec(new AttachmentCodec());
  xmtp.registerCodec(new RemoteAttachmentCodec());

  // console.log(xmtp);

  // const xmtp = await Client.create(signer, {
  //     env: "production"
  // });
  
  
  

  



  console.log("XMTP initalized");
  console.log(xmtp);
//   xmtpClient.value = markRaw(xmtp);

  $xmtpClient.set(xmtp)




};

const checkAccount = async () => {
  try {
    let _address = getAccount(config);

    if (_address.address) {
      address.value = _address.address;
      if(_address.address) await initXmtp();

    } else {

      const connector = getConnectors(config)?.find(x => x.id === "injected")
      // const connector = getConnectors(config)?.find(x => x.id === "coinbaseWalletSDK")
      await connect(config, { connector })
      checkAccount();

    }
  } catch (err) {}
};

onMounted(async () => {
  // console.log('aaa')

  await reconnect(config);

  await checkAccount();
});
</script>
