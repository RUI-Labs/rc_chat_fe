
import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm'
import { nanoid } from "https://cdnjs.cloudflare.com/ajax/libs/nanoid/5.0.7/index.browser.js"
import { getAccount } from "@wagmi/core";
import { config } from "../wagmiConfig";

export const getUserCookie = () => {
    // Set user ID from cookie or create new one
    const user_id = jsCookie.get('rc_cookie') || `race_${nanoid()}`;
    if (!jsCookie.get('rc_cookie')) {
        jsCookie.set('rc_cookie', user_id);
    }
    return user_id;
}



export const getUserSubscriptionId = () => {

    const userId = window?.OneSignal?.User.onesignalId;
    const user = window?.OneSignal?.User;
    const subscriptionId = window?.OneSignal?.User.PushSubscription.id;
    console.log('userId', userId, user, subscriptionId)

    let wallet : any = getAccount(config);
    return subscriptionId || `onesingal-${wallet?.address?.toLowerCase()}`;
}
