import jsCookie from "js-cookie";
import { nanoid } from "nanoid";
import { getAccount } from "@wagmi/core";
import { config } from "@/wagmiConfig";

export const getUserCookie = () => {
    // Set user ID from cookie or create new one
    const user_id = jsCookie.get('rc_cookie') || `race_${nanoid()}`;
    if (!jsCookie.get('rc_cookie')) {
        jsCookie.set('rc_cookie', user_id);
    }
    console.log("user_id", user_id);
    return user_id;
}



export const getUserSubscriptionId = () => {

    const userId = window?.OneSignal?.User.onesignalId;
    const user = window?.OneSignal?.User;
    const subscriptionId = window?.OneSignal?.User.PushSubscription.id;
    const permitted = window?.OneSignal?.Notifications.permission; 
    console.log('onesignal getUserSubscriptionId', userId, user, subscriptionId, permitted)

    let wallet : any = getAccount(config);
    return subscriptionId || `onesingal-${wallet?.address?.toLowerCase()}`;
}


export const isSmartWalletConnected = () => {
    const walletAccount = getAccount(config);
    const connector = walletAccount?.connector;
    // check connect is smart wallet
    return connector?.id === "coinbaseWalletSDK";
}


export const recordUser = async () => {

    const walletAccount = getAccount(config);
    const connector = walletAccount?.connector
    
    // check connect is smart wallet
    if(connector?.id === "coinbaseWalletSDK") {
        // smart wallet



    } else {
        // not smart wallet

    }


}


