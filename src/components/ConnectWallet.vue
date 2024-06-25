<template>

    <div>
        <p>address: {{address}} </p>

        <div v-for="connector of filteredConnector">
            <button @click="selectConnector(connector)" class="border p-2 rounded-xl">{{ connector.name }}</button>
        </div>

        <button @click="createCBWallet()">Create Wallet</button>
        
        <!-- <button @click="connectWallet()">Connect Wallet</button> -->
        <button @click="disconnectWallet()">Disconnect Wallet</button>
    </div>

</template>

<script setup>

    import { computed, onMounted, onUnmounted, ref } from 'vue'

    import { connect, reconnect, getAccount, disconnect, getConnectors, watchConnections } from '@wagmi/core'
    import { config } from '../wagmiConfig'
    import { injected } from '@wagmi/connectors'

    const connectors = ref();
    const address = ref()

    const checkAccount = async () => {
        try {
            let _address = await getAccount(config)

            if (_address) {
                address.value = _address.address
            }
        }catch(err){}
    }

    // onMounted( async () => {
    //     try{
    //         await reconnect(config)
    //     } catch(err) {
    //         // console.log(err)
    //     }
    //     await checkAccount()
    // })
    let unwatch;
    onMounted( async () => {
        // console.log('aaa')
        connectors.value = getConnectors(config);
        // console.log(connectors.value)

        unwatch = watchConnections(config, {
            onChange(data) {
                let _account =  getAccount(config)
                console.log(_account)
                address.value = _account.address;
            },
        })
        await reconnect(config)

        await checkAccount()

    })

    onUnmounted(() => {
        unwatch()
    })

    const selectConnector = async (connector) => {
        await connect(config, { connector })
    }

    const filteredConnector = computed( () => {
        if(connectors.value?.length > 0) {
            return connectors.value.filter((connector) => connector.id !== 'injected')
        } return []
    })

    const createCBWallet = async () => {
        const coinbaseWalletConnector = connectors.value.find(
            (connector) => connector.id === 'coinbaseWalletSDK'
        );

        if (coinbaseWalletConnector) {
            await connect(config, { connector: coinbaseWalletConnector })
        }
    };

    const connectWallet = async () => {
        try{
            await connect(config, { connector: injected() })
        } catch(err) {
            // console.log(err)
        }
        await checkAccount()
    }

    const disconnectWallet = async () => {
        try{
            await disconnect(config)
        } catch(err) {
            // console.log(err)
        }
        await checkAccount()
    }


</script>