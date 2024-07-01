import { atom } from 'nanostores'

export const $showNewStampModal = atom(null);
export const $showWalletModal = atom(null);

export const $showCampaignModal = atom(null);
export const $selectedCampaign = atom(null);


export const $receiptImageData = atom(null);
export const $showReceipt = atom(false)
export const $username = atom("")

import { isSmartWalletConnected } from "@/utils/userAuth";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { loadKeys, storeKeys } from "@/utils/keyStorage";
import { Client } from "@xmtp/xmtp-js";
import { getUserSubscriptionId, getUserCookie } from "@/utils/userAuth";
import { getEthersSigner } from "@/utils/getEthersSigner";
import { config } from "@/wagmiConfig";
import { getAccount } from "@wagmi/core";
import { mainnet } from "viem/chains";
import { AttachmentCodec, RemoteAttachmentCodec, ContentTypeRemoteAttachment } from "@xmtp/content-type-remote-attachment";

export const $xmtpClient = atom(null);

const xmtpOptions = {
    env: "production",
    disablePersistenceEncryption: true,
    // skipContactPublishing: true
};

export const initXmtp = async () => {
    console.log('onesignal', getUserSubscriptionId());

    let xmtpBundleKeys = false;

    if(isSmartWalletConnected()) {
        
        let privateKey = null;
        if($userData.value?.private_xmtp_address) {
            privateKey = $userData.value.private_xmtp_address;
        } else {
            // if no proxy wallet 
            privateKey = generatePrivateKey();
        }

        const paccount = privateKeyToAccount(privateKey);
        const pwallet = createWalletClient({
            account: paccount,
            chain: mainnet,
            transport: http(),
        });
        const proxyAddress = pwallet.account.address;

        xmtpBundleKeys = loadKeys(proxyAddress);

        if(!xmtpBundleKeys) {
            // if no xmtpBundleKeys

            // get xmtpBundleKeys
            xmtpBundleKeys = await Client.getKeys(pwallet, {
                ...xmtpOptions,
            });

            // store to local storage
            storeKeys(proxyAddress, xmtpBundleKeys);

            // save to supabase
            // fetch('/api/keys.json', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         address: proxyAddress.toLowerCase(),
            //         keys: Buffer.from(xmtpBundleKeys).toString("hex"),
            //     })
            // })

            // save contact to supabase
            const wallet =  getAccount(config)
            localStorage.setItem(`xmtp-wallet-${wallet.address.toLowerCase()}`, privateKey);
            fetch('/api/contactbook.json', {
                method: 'POST',
                body: JSON.stringify({
                    "wallet_address": wallet.address.toLowerCase(),
                    "xmtp_address": proxyAddress.toLowerCase(),
                    "onesignal_subscription_id": getUserSubscriptionId(),
                    "private_xmtp_address": privateKey,
                    "name": $username.get(),
                    "cookie": getUserCookie(),
                })
            })



        }


    } else {


        let signer = await getSigner();
        xmtpBundleKeys = loadKeys(signer.address);

        if(!xmtpBundleKeys) {
            // if no xmtpBundleKeys

            // get xmtpBundleKeys
            xmtpBundleKeys = await Client.getKeys(signer, {
                ...xmtpOptions,
            });

            // store to local storage
            storeKeys(signer.address, xmtpBundleKeys);

            // save to supabase
            // await fetch('/api/keys.json', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         address: signer.address.toLowerCase(),
            //         keys: Buffer.from(xmtpBundleKeys).toString("hex"),
            //     })
            // })

            // save contact to supabase
            const wallet = getAccount(config)
            fetch('/api/contactbook.json', {
                method: 'POST',
                body: JSON.stringify({
                    "wallet_address": wallet.address.toLowerCase(),
                    "xmtp_address": wallet.address.toLowerCase(),
                    "onesignal_subscription_id": getUserSubscriptionId(),
                    "private_xmtp_address": `private-${wallet.address.toLowerCase()}`,
                    "name": $username.get(),
                    "cookie": getUserCookie(),
                })
            })


        }


    }


    const xmtp = await Client.create(null, {
        ...xmtpOptions,
        privateKeyOverride: xmtpBundleKeys,
    });

    xmtp.registerCodec(new AttachmentCodec());
    xmtp.registerCodec(new RemoteAttachmentCodec());

    $xmtpClient.set(xmtp);

}




const getSigner = async () => {
    let signer = false;
  
    try {
        signer = await getEthersSigner(config);
        // let _s = await signer.getSigner()
        let _s = await signer.provider.getSigner();
        // return _s;
        signer = _s;
    } catch (err) {
        // throw err;
    }
  
    if (signer) {
        return signer;
    } else {
        setTimeout(async () => { await getSigner() }, 1000);
    }
};


export const $userData = atom(null);
export const initUser = async () => {

    const wallet = getAccount(config);

    if(!wallet.address) {
        $userData.set(null);
        return;
    }

    const sres = await fetch(`/api/wallet/${wallet.address.toLowerCase()}.json`, {
        method: 'GET'
    }).then(res => res.text()).then(result => JSON.parse(result)).catch(error => {
        console.log(error)
    })

    if(isSmartWalletConnected() && sres?.private_xmtp_address) {
        const pkey = sres.private_xmtp_address;
        localStorage.setItem(`xmtp-wallet-${wallet.address.toLowerCase()}`, pkey);
    }

    $userData.set(sres);
}




export const $refreshMessages = atom(false);

export const confirmStampAndSendMessage = async (_projectInfo, _campaign) => {

    const _message = `campaign:${_campaign?.id}`;
    const conversation = await $xmtpClient.value.conversations.newConversation(_projectInfo.owner_address.toLowerCase());
    
    try {
        await conversation.send(_message);
        $refreshMessages.set( !$refreshMessages.value );
    } catch(error) {
        $refreshMessages.set( !$refreshMessages.value );
    }

}

import supabase from "@/supabase";
const SUPABASE_URL = "https://ojvozirqgxgiztlmasrm.supabase.co"

export const sendImage = async (_projectInfo, _campaign) => {

    const filename = `stamp:${_projectInfo.token_address.toLowerCase()}:${_campaign?.id}:${$userData.value.wallet_address.toLowerCase()}:${Date.now()}.png`
    const encodedname = `enodedstamp:${_projectInfo.token_address.toLowerCase()}:${_campaign?.id}:${$userData.value.wallet_address.toLowerCase()}:${Date.now()}`
    const imagetype = "image/png";
    
    const imagefile = base64ToFile($receiptImageData.value, filename, imagetype);

    const imagedata = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
                resolve(reader.result);
            } else {
                reject(new Error("Not an ArrayBuffer"));
            }
        };
        reader.readAsArrayBuffer(imagefile);
    });


    
    
    const attachment = {
        // filename: image?.name,
        "filename": filename,
        // mimeType: image?.type,
        "mimeType": imagetype,
        // data: new Uint8Array(data),
        "data": new Uint8Array(imagedata),
    };

    const encryptedEncoded = await RemoteAttachmentCodec.encodeEncrypted(
        attachment,
        new AttachmentCodec(),
    );

    
    // upload to supabase storage 
    // const imageUp = await supabase.storage.from('stamps').upload(filename, imagefile, { upsert:true })
    // const encodedUp = await supabase.storage.from('stamps').upload(encodedname, encryptedEncoded.payload, { upsert:true })
    const [imageUp, encodedUp] = await Promise.all([
        supabase.storage.from('stamps').upload(filename, imagefile, { upsert:true }),
        supabase.storage.from('stamps').upload(encodedname, encryptedEncoded.payload, { upsert:true }),
    ])

    const url = `${SUPABASE_URL}/storage/v1/object/public/${imageUp.data.fullPath}`
    const encoded_url = `${SUPABASE_URL}/storage/v1/object/public/${encodedUp.data.fullPath}`

    // const upload = await fetch("/api/uploadstamp.json", {
    fetch("/api/uploadstamp.json", {
        method: "POST",
        body: JSON.stringify({
            "url": url,
            "encoded_url": encoded_url,
            "wallet_address": $userData.value.wallet_address.toLowerCase(),
            "campaign_id": _campaign?.id,
            "project_id": _projectInfo.token_address.toLowerCase(),
        })
    }).then(res => res.text()).then(result => JSON.parse(result)).catch(err => {
        console.log(err)
    })


    


    const remoteAttachment = {
        url: encoded_url,
        contentDigest: encryptedEncoded.digest,
        salt: encryptedEncoded.salt,
        nonce: encryptedEncoded.nonce,
        secret: encryptedEncoded.secret,
        scheme: "https://",
        filename: attachment.filename,
        contentLength: attachment.data.byteLength,
    };


    // const reattachment = await RemoteAttachmentCodec.load(remoteAttachment, $xmtpClient.value);

    // const objectURL = URL.createObjectURL(
    //     new Blob([Buffer.from(reattachment.data)], {
    //         type: reattachment.mimeType,
    //     }),
    // );

    const conversation = await $xmtpClient.value.conversations.newConversation(_projectInfo.owner_address.toLowerCase());
    
    try {
        await conversation.send(remoteAttachment, {
            contentType: ContentTypeRemoteAttachment,
        });
        $refreshMessages.set( !$refreshMessages.value );
    } catch(error) {
        $refreshMessages.set( !$refreshMessages.value );
    }


}



const base64ToFile = (base64, filename, contentType = 'image/jpg', sliceSize = 512) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const nblob = new Blob(byteArrays, { type: contentType });
    const file = new File([nblob], `${filename}.jpg`, { type: contentType });

    return file;
}
