<template>

    <div>

        WALLET


        <button @click="createWallet()">Connect</button>
        

        <div v-if="account">
            {{ account.address }}
        </div>


        <button @click="disconnectWallet()">Disconnect</button>


    </div>

</template>


<script setup>


import { getConnectors, connect, getAccount, watchConnections, disconnect, reconnect } from '@wagmi/core'
import { onMounted, ref, onUnmounted } from 'vue';
import { config } from '../wagmiConfig';

const createWallet = async () => {
    const coinbaseWalletConnector = connectors.value.find(
        (connector) => connector.id === 'coinbaseWalletSDK'
    );

    if (coinbaseWalletConnector) {
        await connect(config, { connector: coinbaseWalletConnector })
    }
};

const disconnectWallet = async () => {
    await disconnect(config)
}

const connectors = ref();
const account = ref(null);
let unwatch = null;
onMounted( async () => {
    // console.log('aaa')
    connectors.value = getConnectors(config);
    // console.log(connectors.value)

    unwatch = watchConnections(config, {
        onChange(data) {
            let _account =  getAccount(config)
            console.log(_account)
            account.value = _account;
        },
    })
    await reconnect(config)

})

onUnmounted(() => {
    unwatch()
})

</script>