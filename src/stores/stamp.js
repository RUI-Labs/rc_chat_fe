import { atom } from 'nanostores'

export const $receiptImageData = atom('')
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

export const $xmtpClient = atom(null);

const xmtpOptions = {
    env: "production",
    disablePersistenceEncryption: true,
    // skipContactPublishing: true
};

export const initXmtp = async () => {


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
            await fetch('/api/contactbook.json', {
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
            await fetch('/api/contactbook.json', {
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

    console.log("xmtp", xmtp);
    $xmtpClient.set(xmtp);

}




const getSigner = async () => {
    console.log("getting signer");
    let signer = false;
  
    try {
        signer = await getEthersSigner(config);
        console.log(signer);
        // let _s = await signer.getSigner()
        let _s = await signer.provider.getSigner();
        console.log(_s);
        // return _s;
        signer = _s;
    } catch (err) {
        console.log(err);
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
    }).then(res => res.text()).then(result => JSON.parse(result)).catch(error => null)
    // console.log(sres)

    if(isSmartWalletConnected() && sres?.private_xmtp_address) {
        const pkey = sres.private_xmtp_address;
        localStorage.setItem(`xmtp-wallet-${wallet.address.toLowerCase()}`, pkey);
    }

    $userData.set(sres);

}




