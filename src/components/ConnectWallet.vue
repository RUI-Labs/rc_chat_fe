<template>

    <div>
        <p>address: {{address}} </p>
        <button @click="connectWallet()">Connect Wallet</button>
        <button @click="disconnectWallet()">Disconnect Wallet</button>
    </div>

</template>

<script setup>

    import { onMounted, ref } from 'vue'

    import { connect, reconnect, getAccount, disconnect } from '@wagmi/core'
    import { config } from '../wagmiConfig'
    import { injected } from '@wagmi/connectors'

    const address = ref()

    const checkAccount = async () => {
        try {
            let _address = await getAccount(config)

            if (_address) {
                address.value = _address.address
            }
        }catch(err){}
    }

    onMounted( async () => {
        try{
            await reconnect(config)
        } catch(err) {
            // console.log(err)
        }
        await checkAccount()
    })

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